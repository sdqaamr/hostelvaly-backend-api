import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Single", "Double", "Shared"],
    default: "Shared",
    required: true,
  },
  price: Number,
  available: Number,
});
const RoomTypes = mongoose.model("RoomTypes", roomTypeSchema);

const hostelsSchema = mongoose.Schema({
  name: String,
  city: String,
  area: String,
  address: String,
  contact: String,
  amenities: [String],
  roomType: [roomTypeSchema],
  images: [String],
  rating: Number,
  reviewsCount: Number,
  isAvailable: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
});
const Hostels = new mongoose.model("Hostels", hostelsSchema);

export {RoomTypes, Hostels};
