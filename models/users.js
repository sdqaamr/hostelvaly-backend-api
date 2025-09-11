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
      type: String,
      default: "placeholder.png",
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      set: (v) => {
        if (!v) return v;

        // Remove everything except digits and "+"
        let sanitized = v.replace(/[^\d+]/g, "");

        // Ensure it starts with "+"
        if (!sanitized.startsWith("+")) {
          sanitized = "+" + sanitized.replace(/\+/g, ""); // strip any extra "+"
        }

        // Enforce strict E.164: first digit after "+" must NOT be "0"
        if (/^\+0/.test(sanitized)) {
          throw new Error(
            "Invalid phone number: country code cannot start with 0"
          );
        }

        return sanitized;
      },
      validate: {
        validator: (v) => /^\+[1-9]\d{1,14}$/.test(v), // strict E.164
        message: (props) => `${props.value} is not a valid E.164 phone number!`,
      },
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    otp: {
      type: String,
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
