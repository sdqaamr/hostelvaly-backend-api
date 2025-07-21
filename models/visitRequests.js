import mongoose from 'mongoose';

const visitRequestsSchema = mongoose.Schema({
    fullName: String,
    phone: Number,
    dob: Date,
    whatsappUpdates: Boolean,
    visitDate: Date,
    status: String,
    createdAt: Date,
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
const VisitRequests = mongoose.model("VisitRequests", visitRequestsSchema, "visitRequests");

export default VisitRequests;