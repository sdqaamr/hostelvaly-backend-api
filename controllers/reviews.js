import Reviews from "../models/reviews.js";

let getReviews = async (req, res, next) => {
  try {
    const reviews = await Reviews.find().populate([
      { path: "hostel", select: "name" },
      { path: "user", select: "fullName" },
    ]);
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

let getReview = async (req, res, next) => {
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
        error: null, //execution is successfull
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

let createReview = async (req, res, next) => {
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

let updateReview = async (req, res, next) => {
  try {
    const id = req.params.id;
    let reviewData = req.body;
    let user = req.user;
    let userId = user.id;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null,
        error: null,
      });
    }
    const review = await Reviews.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      reviewData,
      { new: true }
    ).populate([
      { path: "hostel", select: "name" },
      { path: "user", select: "fullName" },
    ]);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review can't be updated or not belongs to the user",
        data: null,
        error: null,
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

let deleteReview = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = req.user;
    const review = await Reviews.deleteOne({
      _id: id,
      user: user.id,
    });
    if (review.deletedCount === 0) {
      return res.status(200).json({
        success: false,
        message: "Review not found or not belongs to the user",
        data: null,
        error: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: review,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

let deleteReviews = async (req, res, next) => {
  try {
    const reviews = await Reviews.find().populate([
      { path: "hostel", select: "name" },
      { path: "user", select: "fullName" },
    ]);
    if (reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No more data to delete",
        data: null,
        error: null,
      });
    }
    await Reviews.deleteMany();
    res.status(200).json({
      success: true,
      message: "Reviews deleted successfully",
      data: reviews,
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
  updateReview,
  deleteReview,
  deleteReviews,
};
