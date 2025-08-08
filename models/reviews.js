import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
  rating: Number,
  comment: String,
  postedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: Boolean,
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bookings",
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostels",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});
const Reviews = new mongoose.model("Reviews", reviewsSchema);

export default Reviews;
