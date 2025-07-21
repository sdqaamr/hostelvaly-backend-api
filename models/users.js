import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    fullName: String,
    email: String,
    role: String,
    phone: String,
    city: String,
    gender: String,
    createdAt: Date,
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostels",
    }],
    hostels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostels",
    }],
});
const Users = new mongoose.model("Users", usersSchema);

export default Users;