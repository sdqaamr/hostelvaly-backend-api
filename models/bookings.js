import mongoose from "mongoose";

const bookingsSchema = mongoose.Schema({
  roomType: String,
  price: Number,
  status: String,
  paymentMethod: String,
  fromDate: Date,
  toDate: Date,
  bookingDate: Date,
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
