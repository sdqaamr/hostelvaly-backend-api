import Users from "../models/users.js";

const checkBannedUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
    if (user && user.status === "banned") {
      return res.status(403).json({
        success: false,
        message: "Account is banned",
        data: null,
        error: ["Your account has been banned. Please contact support."],
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkBannedUser;
