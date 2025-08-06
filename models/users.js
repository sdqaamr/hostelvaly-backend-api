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
  otpExpiresAt: Date,
  password: String,
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/dz4qj1x5f/image/upload/v1709301234/hostelvaly/default-profile-picture.png",
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
