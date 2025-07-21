import mongoose from 'mongoose';

const hostelsSchema = mongoose.Schema({
    name: String,
    city: String,
    area: String,
    address: String,
    contact: String,
    amenities: Array,
    roomTypes: {
        type: String,
        price: Number,
        available: Number,
    },
    rating: Number,
    reviewsCount: Number,
    isAvailable: Boolean,
});
const Hostels = new mongoose.model("Hostels", hostelsSchema);

export default Hostels;