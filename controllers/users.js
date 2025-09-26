import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/send-mail.js";

const getUsers = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 5);
    const skip = (page - 1) * limit;

    const [total, users] = await Promise.all([
      Users.countDocuments(),
      Users.find()
        .skip(skip)
        .limit(limit)
        .select([
          "fullName",
          "email",
          "role",
          "phone",
          "city",
          "favorites",
          "hostelsOwned",
          "bookings",
        ])
        .populate("favorites", ["name"])
        .populate("hostelsOwned", ["name"])
        .populate("bookings", ["hostel", "fromDate", "toDate"]),
    ]);

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    let id = req.user.id;
    const user = await Users.findById(id)
      .select([
        "fullName",
        "email",
        "role",
        "phone",
        "city",
        "favorites",
        "hostelsOwned",
        "bookings",
        "visitRequests",
        "reviewsPosted",
      ])
      .populate("favorites", ["name"])
      .populate("hostelsOwned", ["name"])
      .populate("bookings", ["hostel", "fromDate", "toDate"])
      .populate("visitRequests", ["hostel", "visitDate"])
      .populate("reviewsPosted", ["comment", "hostel"]);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: ["No user exists with the given ID"],
      });
    }
    res.status(200).json({
      success: true,
      id: id,
      message: "User data is fetched successfully",
      data: user,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    let { fullName, email, password, confirmPassword } = req.body;
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
    const otpTTLMinutes = parseInt(process.env.OTP_TTL_MINUTES, 10) || 10;
    const otpExpiresIn = Date.now() + otpTTLMinutes * 60 * 1000;
    const user = new Users({
      fullName,
      email,
      password: hash,
      otp,
      otpExpiresIn,
    });
    await user.save();
    sendEmail(email, "Verify your email", {
      otp,
      otpExpiresIn,
      otpTTLMinutes,
      fullName,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        otpExpiresIn: user.otpExpiresIn,
        status: user.status,
        createdAt: user.createdAt,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

// Verify Email with OTP
const verifyEmail = async (req, res, next) => {
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
        error: ["No user exists with the given email"],
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
    if (user.otpExpiresIn < Date.now()) {
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
    user.otpExpiresIn = null;
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
    next(error);
  }
};

// Resend OTP
const resendOtp = async (req, res, next) => {
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
    const otpTTLMinutes = parseInt(process.env.OTP_TTL_MINUTES, 10) || 10;
    user.otp = otp;
    user.otpExpiresIn = Date.now() + otpTTLMinutes * 60 * 1000;
    await user.save();

    // Send OTP email
    await sendEmail(user.email, "Resend OTP - Verify your email", {
      otp,
      otpExpiresIn: user.otpExpiresIn,
      otpTTLMinutes,
      fullName: user.fullName,
    });
    console.log("📧 Resending OTP:", otp, "to", user.email);
    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      data: { email: user.email },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const user = await Users.findOne({ email: email })
      .populate("favorites", ["name"])
      .populate("hostelsOwned", ["name"])
      .populate("bookings", ["hostel", "fromDate", "toDate"])
      .populate("visitRequests", ["hostel", "visitDate"])
      .populate("reviewsPosted", ["comment", "hostel"]);
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
          otpExpiresIn: user.otpExpiresIn,
          status: user.status,
          createdAt: user.createdAt,
          favorites: user.favorites,
          hostels: user.hostels,
          favorites: user.favorites,
          hostelsOwned: user.hostelsOwned,
          bookings: user.bookings,
          visitRequests: user.visitRequests,
          reviewsPosted: user.reviewsPosted,
        },
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
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
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // Prevent email, otp, role, and password etc. updates
    const forbiddenFields = [
      "email",
      "role",
      "password",
      "otp",
      "otpExpiresIn",
      "password",
      "createdAt",
      "updatedAt",
      "status",
      "favorites",
      "hostelsOwned",
      "bookings",
      "visistRequests",
      "reviewsPosted",
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
      "profilePicture",
      "phone",
      "city",
      "createdAt",
      "updatedAt",
    ]);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: ["No user exists with the given ID"],
      });
    }
    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: user,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    let id = req.params.id;
    const user = await Users.findByIdAndDelete(id).select([
      "fullName",
      "email",
      "role",
      "phone",
      "city",
      "gender",
    ]);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: ["No user exists with the given ID"],
      });
    }
    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: user,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const toggleUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params; // userId to toggle
    const requester = req.user; // comes from verifyToken middleware

    // Only admin can toggle user status
    // if (requester.role !== "admin") {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Forbidden: Only admins can change user status",
    //     data: null,
    //     error: ["Permission denied"],
    //   });
    // }
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: ["No user exists with the given ID"],
      });
    }
    // Handle inactive accounts
    if (user.status === "inactive") {
      return res.status(400).json({
        success: false,
        message: "User account is inactive and cannot be toggled",
        data: null,
        error: ["Activate the user before banning/unbanning"],
      });
    }
    // Toggle logic
    if (user.status === "active") {
      user.status = "banned";
    } else if (user.status === "banned") {
      user.status = "active";
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: `User status changed to ${user.status}`,
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        status: user.status,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getUsers,
  getProfile,
  register,
  verifyEmail,
  resendOtp,
  loginUser,
  changePassword,
  updateProfile,
  logout,
  toggleUserStatus,
};
