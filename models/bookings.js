import mongoose from "mongoose";

function transformBooking(doc, ret) {
  if (ret.hostel?.roomTypes && Array.isArray(ret.hostel.roomTypes)) {
    const found = ret.hostel.roomTypes.find(
      (rt) => rt._id.toString() === ret.roomType?.toString()
    );
    if (found) ret.roomType = found;
  }
  return ret;
}

const bookingsSchema = mongoose.Schema(
  {
    roomType: {
      type: mongoose.Schema.Types.ObjectId,
    },
    price: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["bank transfer", "cash"],
      default: "bank transfer",
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
  },
  {
    toJSON: { virtuals: true, transform: transformBooking },
    toObject: { virtuals: true, transform: transformBooking },
  }
);
const Bookings = new mongoose.model("Bookings", bookingsSchema);

export default Bookings;
