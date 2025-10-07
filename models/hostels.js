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
    maxlength: 200,
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
    city: {
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
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    roomType: [roomTypeSchema],
    images: [String],
    description: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    securityCharges: {
      type: Number,
      default: null,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews",
      },
    ],
    rating: Number,
    reviewsCount: Number,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings",
      },
    ],
    visitRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VisitRequests",
      },
    ],
  },
  { timestamps: true }
);
const Hostels = new mongoose.model("Hostels", hostelsSchema);

export { roomTypeSchema, Hostels };
