import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      error: error.message,
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
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        status: user.status,
        profilePicture: user.profilePicture,
        city: user.city,
        phone: user.phone,
        fullName: user.fullName,
        otp: user.otp,
        otpExpiresAt: user.otpExpiresAt,
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: error.message,
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
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
          data: null,
          error: err.message,
        });
      }
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
          favorites: user.favorites,
          hostels: user.hostels,
        },
        error: null,
      });
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

let loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await Users.findOne({ email: email }).populate([
      "favorites",
      "hostels",
    ]);
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "Authentication failed",
        data: null,
        error: ["Invalid email or password!"],
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: true,
        message: "Authentication failed",
        data: null,
        error: ["Invalid email or password!"],
      });
    }
    if (user.status === "inactive") {
      res.status(403).json({
        success: false,
        message: "Account is inactive",
        data: null,
        error: ["Please contact support"],
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
      error: error.message,
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
        message: "Change password failed",
        data: null,
        error: ["Invalid old password"],
      });
    }
    bcrypt.hash(newPassword, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          data: null,
          error: err.message,
        });
      }
      user.password = hash;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password changed successfully",
        data: null,
        error: null,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: err.message,
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
    const user = await Users.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    }).populate(["favorites", "hostels"]);

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
      error: error.message,
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
      error: error.message,
    });
  }
};

export {
  getUsers,
  getProfile,
  signupUser,
  loginUser,
  changePassword,
  updateProfile,
  logout,
  deleteUsers,
};
