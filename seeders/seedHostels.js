const seedHostels = async () => {
    const module = await import("../models/hostels.js");
    const Hostels = module.default;
    const count = await Hostels.countDocuments();
    if (count > 0) {
        console.log("Hostels already seeded.");
        return;
    }
    const hostelData = [
        {
            _id:"689203c34664390116bf70ef",
            name: "Sunrise Hostel",
            city: "Lahore",
            area: "DHA",
            address: "123 DHA Phase 5, Lahore",
            contact: "0300-1234567",
            amenities: ["WiFi", "Laundry", "Mess", "Parking"],
            roomTypes: { type: "Single", price: 12000, available: 10 },
            rating: 4.5,
            reviewsCount: 12,
            isAvailable: true
        },
        {
            _id:"689203c34664390116bf70f0",
            name: "Moonlight Hostel",
            city: "Karachi",
            area: "Gulshan",
            address: "45 Gulshan Block 2, Karachi",
            contact: "0311-7654321",
            amenities: ["WiFi", "AC", "Security"],
            roomTypes: { type: "Double", price: 9000, available: 8 },
            rating: 4.2,
            reviewsCount: 8,
            isAvailable: true
        }
    ];
    await Hostels.insertMany(hostelData);
    console.log("Hostels seeded successfully.");
};

export default seedHostels;
