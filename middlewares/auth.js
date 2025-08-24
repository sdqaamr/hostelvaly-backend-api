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

export { verifyToken };
