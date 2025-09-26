import multer from "multer";

const jsonErrorHandler = (err, req, res, next) => {
  // Handle malformed JSON
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format",
      data: null,
      error: ["The request body contains malformed JSON"],
    });
  }

  // Handle Multer errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: "File upload error",
      data: null,
      error: [err.message], // e.g., "Field name missing"
    });
  }

  // Handle all other errors
  return res.status(err.status || 500).json({
    success: false,
    message: "Internal Server Error",
    data: null,
    error: [err.message || "Unexpected error"],
  });
};

export default jsonErrorHandler;
