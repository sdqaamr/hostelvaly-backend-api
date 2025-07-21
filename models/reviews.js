import mongoose from 'mongoose';

const reviewsSchema = mongoose.Schema({
    rating: Number,
    comment: String,
    postedAt: Date,
    isVerified: Boolean,
    visitDate: Date,
    createdAt: Date,
    notes: String,
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostels",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings",
    },
});
const Reviews = new mongoose.model("Reviews", reviewsSchema);

export default Reviews;