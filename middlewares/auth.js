import jwt from "jsonwebtoken";

let verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
        data: null,
        error: ["Token not provided"],
      });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Authentication failed",
            data: null,
            error: err.message,
          });
        }
        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: error.message,
    });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
      data: null,
      error: ["You do not have permission to perform this action"],
    });
  }
  next();
};

const verifyOwner = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
      data: null,
      error: ["You do not have permission to perform this action"],
    });
  }
  next();
};

export { verifyToken, verifyAdmin, verifyOwner };
