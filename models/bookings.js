import mongoose from "mongoose";

const bookingsSchema = mongoose.Schema({
  roomType: {
    type: String,
    enum: ["Single", "Double", "Shared"],
    default: "Shared",
  },
  price: Number,
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["Bank Transfer", "Cash"],
    default: "Bank Transfer",
  },
  fromDate: {
    type: Date,
    default: Date.now,
  },
  toDate: {
    type: Date,
    default: Date.now,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
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
const Bookings = new mongoose.model("Bookings", bookingsSchema);

export default Bookings;
