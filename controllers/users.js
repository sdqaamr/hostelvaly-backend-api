import Users from "../models/users.js";
import bcrypt from "bcrypt";

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

let getUser = async (req, res) => {
  try {
    let id = req.params.id;
    const user = await Users.findById(id)
      .select(["fullName", "email", "role", "city", "hostels", "favorites"])
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
      data: user,
      error: null,
    });
  } catch (error) {
    res.status.apply(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: error.message,
    });
  }
};

let putUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByIdAndUpdate(id, req.body, {
      new: true,
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

let signupUser = async (req, res) => {
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
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
          data: null,
          error: err.message,
        });
      }
      const user = new Users({ fullName, email, password: hash });
      await user.save();
      let tempUser = {
        name: user.fullName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        phone: user.phone,
        city: user.city,
        gender: user.gender,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        status: user.status,
        favorites: user.favorites,
        hostels: user.hostels,
      };
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: tempUser,
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
    const user = await Users.findOne({ email: email });
    if (!user) {
      // return res.status(404).json({
      //   success: false,
      //   message: "User not found",
      //   data: null,
      //   error: null, //execution is successfull
      // });
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
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
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
  } catch (error) {
    res.status.apply(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: error.message,
    });
  }
};

let deleteUser = async (req, res) => {
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
  getUser,
  putUser,
  signupUser,
  loginUser,
  deleteUser,
  deleteUsers,
};
