import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0 && value < 6,
      message: "Rating must be greater than 0 and less than 6",
    },
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 300,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostels",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});
const Reviews = new mongoose.model("Reviews", reviewsSchema);

export default Reviews;
