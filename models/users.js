import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  fullName: String,
  email: String,
  role: {
    type: String,
    enum: ["admin", "owner", "student"],
    default: "student",
  },
  otp: Number,
  otpExpiresAt: {
    type: Date,
    default: Date.now,
  },
  password: String,
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/dz4qj1x5f/image/upload/v1709301234/hostelvaly/default-profile-picture.png",
  },
  phone: String,
  city: String,
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "banned"],
    default: "active",
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostels",
    },
  ],
  hostels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostels",
    },
  ],
});
const Users = new mongoose.model("Users", usersSchema);

export default Users;
