import Reviews from "../models/reviews.js";

let getReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find()
      .select([
        "rating",
        "comment",
        "postedAt",
        "isVerified",
        "createdAt",
        "hostel",
        "user",
        "booking",
      ])
      .populate(["hostel", "user"]);
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
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

let getReview = async (req, res) => {
  try {
    let id = req.params.id;
    const review = await Reviews.findById(id)
      .select([
        "rating",
        "comment",
        "postedAt",
        "isVerified",
        "createdAt",
        "hostel",
        "user",
        "booking",
      ])
      .populate(["hostel", "user"]);
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
    res.status.apply(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: error.message,
    });
  }
};

let putReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Reviews.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate(["hostel", "user"]);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};

let postReviews = async (req, res) => {
  try {
    let { rating, comment } = req.body;
    let validationErrors = [];
    if (!rating) {
      validationErrors.push("Rating is required");
    }
    if (!comment) {
      validationErrors.push("Comment message is required");
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: null,
        error: validationErrors,
      });
    }
    const review = new Reviews(req.body).populate(["hostel", "user"]);
    await review.save();
    res.status(201).json({
      success: true,
      message: "Data created successfully",
      data: review,
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

let deleteReview = async (req, res) => {
  try {
    let id = req.params.id;
    const review = await Reviews.findByIdAndDelete(id).populate([
      "hostel",
      "user",
    ]);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};

let deleteReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find().populate(["hostel", "user"]);
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};

export {
  getReviews,
  getReview,
  putReview,
  postReviews,
  deleteReview,
  deleteReviews,
};
