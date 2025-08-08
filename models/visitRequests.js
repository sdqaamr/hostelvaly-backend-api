import mongoose from "mongoose";

const visitRequestsSchema = mongoose.Schema({
  fullName: String,
  phone: Number,
  whatsappUpdates: Boolean,
  visitDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  notes: String,
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostels",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});
const VisitRequests = mongoose.model(
  "VisitRequests",
  visitRequestsSchema,
  "visitRequests"
);

export default VisitRequests;
