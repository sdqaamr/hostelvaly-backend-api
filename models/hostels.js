import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Fan", "Cooler", "AC"],
    default: "Fan",
    required: true,
  },
  description: String,
  price: Number,
  available: Number,
});

const hostelsSchema = mongoose.Schema({
  name: String,
  city: String,
  area: String,
  address: String,
  contact: String,
  amenities: [String],
  roomType: [roomTypeSchema],
  images: [String],
  description: String,
  rating: Number,
  reviewsCount: Number,
  isAvailable: Boolean,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },
});
const Hostels = new mongoose.model("Hostels", hostelsSchema);

export { roomTypeSchema, Hostels };
