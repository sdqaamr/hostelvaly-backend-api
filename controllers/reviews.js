import Reviews from "../models/reviews.js";
import mongoose from "mongoose";

const getReviews = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 5);
    const skip = (page - 1) * limit;
    const [total, reviews] = await Promise.all([
      Reviews.countDocuments(),
      Reviews.find()
        .skip(skip)
        .limit(limit)
        .populate("hostel", ["name"])
        .populate("user", ["fullName"]),
    ]);
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
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

const getReview = async (req, res, next) => {
  try {
    let id = req.params.id;
    const review = await Reviews.findById(id).populate([
      { path: "hostel", select: "name" },
      { path: "user", select: "fullName" },
    ]);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
        data: null,
        error: ["Review not exists with the given ID"],
      });
    }
    res.status(200).json({
      success: true,
      id: id,
      message: "Review fetched successfully",
      data: review,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    let { rating, comment, hostel } = req.body;
    let validationErrors = [];
    if (!rating) {
      validationErrors.push("Rating is required");
    }
    if (!comment) {
      validationErrors.push("Comment message is required");
    }
    if (!hostel) {
      validationErrors.push("Hostel ID is required");
    }
    // Check if hostel is a valid ObjectId
    if (hostel && !mongoose.Types.ObjectId.isValid(hostel)) {
      validationErrors.push("Hostel ID is not a valid ObjectId");
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: null,
        error: validationErrors,
      });
    }
    let user = req.user;
    let review = new Reviews({ rating, comment, hostel, user: user.id });
    await review.save();
    await review.populate([
      { path: "hostel", select: "name" },
      { path: "user", select: "fullName" },
    ]);
    res.status(201).json({
      success: true,
      message: "Data created successfully",
      data: review,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const toggleReviewVerification = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const review = await Reviews.findById(reviewId)
      .populate("hostel", "name")
      .populate("user", "fullName");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
        data: null,
        error: ["Invalid review ID"],
      });
    }
    // Toggle true <-> false
    review.isVerified = !review.isVerified;
    await review.save();
    res.status(200).json({
      success: true,
      message: `Review verification toggled to ${review.isVerified}`,
      data: {
        id: review._id,
        isVerified: review.isVerified,
        hostel: review.hostel?.name,
        user: review.user?.fullName,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    let reviewData = req.body;
    const forbiddenFields = ["postedAt", "isVerified", "hostel"];
    forbiddenFields.forEach((field) => {
      if (field in req.body) {
        delete req.body[field];
      }
    });
    const review = await Reviews.findByIdAndUpdate(reviewId, reviewData, {
      new: true,
      runValidators: true,
    }).populate([
      { path: "hostel", select: "name" },
      { path: "user", select: "fullName" },
    ]);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review can't be updated or not belongs to the user",
        data: null,
        error: ["Review not found or you are not authorized to update it"],
      });
    }
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    let id = req.params.id;
    const review = await Reviews.findByIdAndDelete(id);
    if (!review) {
      return res.status(200).json({
        success: false,
        message: "Review not found or not belongs to the user",
        data: null,
        error: ["Review does not exist with the given ID"],
      });
    }
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: review,
      error: null,
    });

  } catch (error) {
    next(error);
  }
};

export {
  getReviews,
  getReview,
  createReview,
  toggleReviewVerification,
  updateReview,
  deleteReview,
};
