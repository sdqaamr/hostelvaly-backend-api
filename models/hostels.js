import mongoose from "mongoose";

const hostelsSchema = mongoose.Schema({
  name: String,
  city: String,
  area: String,
  address: String,
  contact: String,
  amenities: [String],
  roomTypes: [
    {
      type: {
        type: String,
        enum: ["Single", "Double", "Shared"],
      },
      price: {
        type: Number,
      },
      available: {
        type: Number,
        default: 0,
      },
    },
  ],
  images: [String],
  rating: Number,
  reviewsCount: Number,
  isAvailable: Boolean,
});
const Hostels = new mongoose.model("Hostels", hostelsSchema);

export default Hostels;
