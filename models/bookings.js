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
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["bank transfer", "cash"],
      default: "bank transfer",
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, transform: transformBooking },
    toObject: { virtuals: true, transform: transformBooking },
  }
);
const Bookings = new mongoose.model("Bookings", bookingsSchema);

export default Bookings;
