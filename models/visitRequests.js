import mongoose from "mongoose";

const visitRequestsSchema = mongoose.Schema(
  {
    visitDate: {
      type: Date,
      required: true,
    },
    whatsappUpdates: {
      type: Boolean,
      default: false,
    },
    // emailUpdates: {
    //   type: Boolean,
    //   default: true,
    // },
    notes: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostels",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);
const VisitRequests = mongoose.model(
  "VisitRequests",
  visitRequestsSchema,
  "visitRequests"
);

export default VisitRequests;
