import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    role: {
      type: String,
      enum: ["admin", "owner", "student"],
      default: "student",
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      url: { 
        type: String, 
        trim: true, 
        default: "https://res.cloudinary.com/djr88us3q/image/upload/v1759763922/xivirhvfjzx8omplxvbj.webp" 
      },
      publicId: { 
        type: String, 
        trim: true, 
        default: "xivirhvfjzx8omplxvbj" 
      },
    },
    phone: String,
    city: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    otp: {
      type: Number,
      default: null,
    },
    otpExpiresIn: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "inactive",
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostels",
      },
    ],
    hostelsOwned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostels",
      },
    ],
    bookings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookings",
    },
    visitRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VisitRequests",
      },
    ],
    reviewsPosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews",
      },
    ],
  },
  { timestamps: true }
);
const Users = new mongoose.model("Users", usersSchema);

export default Users;
