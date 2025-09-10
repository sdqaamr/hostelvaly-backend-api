import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/send-mail.js";

let getUsers = async (req, res) => {
  try {
    const users = await Users.find()
      .select(["fullName", "email", "role", "city", "hostels", "favorites"])
      .populate(["favorites", "hostels"]);
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: users,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: [error.message],
    });
  }
};

let getProfile = async (req, res) => {
  try {
    let id = req.user.id;
    const user = await Users.findById(id)
      .select([
        "fullName",
        "email",
        "role",
        "city",
        "hostels",
        "favorites",
        "profilePicture",
        "status",
        "phone",
        "createdAt",
        "otp",
        "otpExpiresAt",
      ])
      .populate(["favorites", "hostels"]);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: null, //execution is successfull
      });
    }
    res.status(200).json({
      success: true,
      id: id,
      message: "User data by ID is fetched successfully",
      data: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        status: user.status,
        profilePicture: user.profilePicture,
        city: user.city,
        phone: user.phone,
        otpExpiresAt: user.otpExpiresAt,
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: [error.message],
    });
  }
};

let signupUser = async (req, res) => {
  try {
    let { fullName, email, password, confirmPassword, role } = req.body;
    let validationErrors = [];
    if (!fullName) {
      validationErrors.push("Full name is required");
    }
    if (!email) {
      validationErrors.push("Email is required");
    }
    if (!password) {
      validationErrors.push("Password is required");
    }
    if (!confirmPassword) {
      validationErrors.push("Password confirmation is required");
    }
    if (password !== confirmPassword) {
      validationErrors.push("Passwords do not match");
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: null,
        error: validationErrors,
      });
    }
    let userExist = await Users.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        data: null,
        error: ["User with this email already exists"],
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpiresAt = Date.now() + 10 * 60 * 1000;
    const user = new Users({
      fullName,
      email,
      password: hash,
      role,
      otp,
      otpExpiresAt,
    });
    await user.save();
    sendEmail(email, "Verify your email", String(otp));
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        phone: user.phone,
        city: user.city,
        gender: user.gender,
        createdAt: user.createdAt,
        status: user.status,
        otpExpiresAt: user.otpExpiresAt,
        favorites: user.favorites,
        hostels: user.hostels,
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: [error.message],
    });
  }
};

// Verify Email with OTP
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    let errors = [];
    if (!email) {
      errors.push("Email is required");
    }
    if (!otp) {
      errors.push("OTP is required");
    }
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: null,
        error: errors,
      });
    }
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: null,
      });
    }
    // Check OTP validity
    if (user.otp !== Number(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
        data: null,
        error: ["The OTP you entered is incorrect"],
      });
    }
    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
        data: null,
        error: ["Your OTP has expired. Please request a new one."],
      });
    }
    // Update user status after successful verification
    user.status = "active";
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: [error.message],
    });
  }
};

// Resend OTP
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
        data: null,
        error: ["Please provide an email to resend OTP"],
      });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: null,
      });
    }
    if (user.status === "active") {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
        data: null,
        error: [
          "You cannot request OTP because your email is already verified",
        ],
      });
    }
    // Generate new OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Send OTP email
    await sendEmail(user.email, "Resend OTP - Verify your email", String(otp));
    console.log("📧 Resending OTP:", otp, "to", user.email);
    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      data: { email: user.email },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: [error.message],
    });
  }
};

let loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await Users.findOne({ email: email }).populate([
      "favorites",
      "hostels",
    ]);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
        data: null,
        error: ["Invalid email or password!"],
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
        data: null,
        error: ["Invalid email or password!"],
      });
    }
    if (user.status === "inactive") {
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
        data: null,
        error: ["Please verify your email"],
      });
    }
    let token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token: token,
        user: {
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture,
          phone: user.phone,
          city: user.city,
          gender: user.gender,
          createdAt: user.createdAt,
          status: user.status,
          favorites: user.favorites,
          hostels: user.hostels,
        },
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: [error.message],
    });
  }
};

const changePassword = async (req, res) => {
  try {
    let userId = req.user.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    let errors = [];
    if (!oldPassword) {
      errors.push("Old password is required");
    }
    if (!newPassword) {
      errors.push("New password is required");
    }
    if (!confirmPassword) {
      errors.push("Password confirmation is required");
    }
    if (oldPassword === newPassword) {
      errors.push("New password cannot be same as old password");
    }
    if (newPassword !== confirmPassword) {
      errors.push("Passwords do not match");
    }
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        data: null,
        error: errors,
      });
    }
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: null,
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password cannot be changed",
        data: null,
        error: ["Invalid old password"],
      });
    }
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: [error.message],
    });
  }
};

let updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Comes from verifyToken middleware
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null,
        error: null,
      });
    }
    // Prevent email, otp, role, and password updates
    const forbiddenFields = [
      "email",
      "role",
      "otp",
      "otpExpiresAt",
      "password",
      "createdAt",
      "updatedAt",
      "status",
      "favorites",
      "hostels",
    ];
    forbiddenFields.forEach((field) => {
      if (field in req.body) {
        delete req.body[field];
      }
    });
    const user = await Users.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    }).select([
      "fullName",
      "email",
      "role",
      "city",
      "profilePicture",
      "status",
      "phone",
      "createdAt",
      "updatedAt",
      "otpExpiresAt",
    ]);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: user,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: [error.message],
    });
  }
};

let logout = async (req, res) => {
  try {
    let id = req.params.id;
    const user = await Users.findByIdAndDelete(id).populate([
      "favorites",
      "hostels",
    ]);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: user,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};

let deleteUsers = async (req, res) => {
  try {
    const users = await Users.find().populate(["favorites", "hostels"]);
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No more data to delete",
        data: null,
        error: null,
      });
    }
    await Users.deleteMany();
    res.status(200).json({
      success: true,
      message: "Users data deleted successfully",
      data: users,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: [error.message],
    });
  }
};

export {
  getUsers,
  getProfile,
  signupUser,
  verifyEmail,
  resendOtp,
  loginUser,
  changePassword,
  updateProfile,
  logout,
  deleteUsers,
};
