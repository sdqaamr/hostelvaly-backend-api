const seedReviews = async () => {
    const module = await import("../models/reviews.js");
    const Reviews = module.default;
    const count = await Reviews.countDocuments();
    if (count > 0) {
        console.log("Reviews already seeded.");
        return;
    }
    // Example review data (hostel/user/booking ObjectIds should be valid in your DB)
    const reviewData = [
        {
            rating: 5,
            comment: "Excellent stay! Highly recommended.",
            postedAt: new Date(),
            isVerified: true,
            visitDate: new Date('2025-07-01'),
            createdAt: new Date(),
            notes: "Clean and comfortable.",
            hostel:"689203c34664390116bf70ef", // Set valid ObjectId if available
            user: undefined,   // Set valid ObjectId if available
            booking: undefined // Set valid ObjectId if available
        },
        {
            rating: 3,
            comment: "Average experience, could be better.",
            postedAt: new Date(),
            isVerified: false,
            visitDate: new Date('2025-06-15'),
            createdAt: new Date(),
            notes: "Food was okay.",
            hostel: "689203c34664390116bf70ef",
            user: undefined,
            booking: undefined
        }
    ];
    await Reviews.insertMany(reviewData);
    console.log("Reviews seeded successfully.");
};

export default seedReviews;
