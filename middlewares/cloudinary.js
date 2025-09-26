import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        stream.end(buffer);
      });
    };

    const result = await streamUpload(req.file.buffer);

    req.cloudinaryFile = {
      url: result.secure_url,
      publicId: result.public_id,
    };

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "File is not uploaded to Cloudinary",
      error: [error.message],
    });
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
  }
};
