export const checkRequestBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one field is required",
      data: null,
      error: ["Request body is empty"],
    });
  }
  next();
};

export const checkUpdateBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No fields provided to update",
      data: null,
      error: ["At least one field is required"],
    });
  }
  next();
};
