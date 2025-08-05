import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/dz4qj1x5f/image/upload/v1709301234/hostelvaly/default-profile-picture.png",
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpiresAt: {
    type: Date,
    default: null,
  },
  role: {
    type: String,
    enum: ["owner", "user", "admin"],
    default: "user",
  },
  phone: String,
  city: String,
  gender: String,
  createdAt: Date,
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
