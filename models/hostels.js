import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["fan", "cooler", "ac"],
    default: "fan",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 30,
  },
  monthlyRent: {
    type: Number,
    required: true,
  },
  availableRooms: {
    type: Number,
    required: true,
  },
});

const hostelsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    roomTypes: [roomTypeSchema],
    images: [String],
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 80,
    },
    securityCharges: {
      type: Number,
      default: null,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    reviews: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviews",
    },
    rating: Number,
    reviewsCount: Number,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    bookings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookings",
    },
    visitRequests: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VisitRequests",
    },
  },
  { timestamps: true }
);
const Hostels = new mongoose.model("Hostels", hostelsSchema);

export { roomTypeSchema, Hostels };
