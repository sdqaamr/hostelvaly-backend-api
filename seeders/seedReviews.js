const seedReviews = async () => {
  const module = await import("../models/reviews.js");
  const Reviews = module.default;
  const count = await Reviews.countDocuments();
  if (count > 0) {
    console.log("Reviews already seeded.");
    return;
  }
  // Example Reviews data
  const reviewsData = [
    {
      _id: "687a9af9880e74a450aef542",
      rating: 4,
      comment:
        "The hostel was well-maintained and located in a peaceful area. The rooms were clean and the staff was helpful, but I felt the price was slightly higher than expected for students.",
      postedAt: "2025-07-14T15:00:00.000Z",
      isVerified: true,
      booking: "687a908aadca98b6494c189a",
      hostel: "687a8a22cc7148c1e78a99c0",
      user: "687a8d8f69d717b002fa06a1",
    },
    {
      _id: "687a9af9880e74a450aef543",
      rating: 5,
      comment:
        "Excellent experience! The rooms were comfortable, and the mess food was hygienic. Security measures were also good, making it a safe place for female residents like me.",
      postedAt: "2025-07-15T09:30:00.000Z",
      isVerified: true,
      booking: "687a908aadca98b6494c189b",
      hostel: "687a8a22cc7148c1e78a99c3",
      user: "687a8d8f69d717b002fa06a7",
    },
    {
      _id: "687a9af9880e74a450aef544",
      rating: 3,
      comment:
        "The hostel is okay overall. Room condition was decent, but the food variety was repetitive. WiFi speed was inconsistent, especially during evenings when everyone was online.",
      postedAt: "2025-07-11T12:00:00.000Z",
      isVerified: true,
      booking: "687a908aadca98b6494c189c",
      hostel: "687a8a22cc7148c1e78a99c3",
      user: "687a8d8f69d717b002fa06a8",
    },
    {
      _id: "687a9af9880e74a450aef545",
      rating: 4,
      comment:
        "Really nice and budget-friendly hostel for students. The environment is quiet, perfect for studying. However, the laundry service takes longer than expected on weekends.",
      postedAt: "2025-07-14T18:20:00.000Z",
      isVerified: true,
      booking: "687a908aadca98b6494c1899",
      hostel: "687a8a22cc7148c1e78a99be",
      user: "687a8d8f69d717b002fa06a5",
    },
    {
      _id: "687a9af9880e74a450aef546",
      rating: 3,
      comment:
        "Affordable hostel in a good location. The shared rooms are a bit cramped, and cleanliness could be improved in common areas like the dining hall and kitchen.",
      postedAt: "2025-07-13T10:40:00.000Z",
      isVerified: true,
      booking: "687a908aadca98b6494c189e",
      hostel: "687a8a22cc7148c1e78a99c2",
      user: "687a8d8f69d717b002fa06a4",
    },
    {
      _id: "687a9af9880e74a450aef547",
      rating: 4,
      comment:
        "The staff was very welcoming and made sure everything was well organized. I faced minor issues with the water supply in the mornings, but overall it was a good stay.",
      postedAt: "2025-07-14T14:45:00.000Z",
      isVerified: false,
      booking: "687a908aadca98b6494c189f",
      hostel: "687a8a22cc7148c1e78a99c2",
      user: "687a8d8f69d717b002fa06a9",
    },
    {
      _id: "687a9af9880e74a450aef548",
      rating: 5,
      comment:
        "One of the best hostels in DHA. Clean environment, well-lit rooms, and a very cooperative management team. It’s also very close to my university which saved commute time.",
      postedAt: "2025-07-10T10:00:00.000Z",
      isVerified: true,
      booking: "687a908aadca98b6494c18a0",
      hostel: "687a8a22cc7148c1e78a99bf",
      user: "687a8d8f69d717b002fa06a0",
    },
    {
      _id: "687a9af9880e74a450aef549",
      rating: 4,
      comment:
        "Spacious double rooms with good ventilation. Laundry and mess services were timely. My only issue was occasional noise from nearby traffic during the evenings.",
      postedAt: "2025-07-09T17:00:00.000Z",
      isVerified: true,
      booking: "687a908aadca98b6494c189d",
      hostel: "687a8a22cc7148c1e78a99c3",
      user: "687a8d8f69d717b002fa06a2",
    },
    {
      _id: "687a9af9880e74a450aef54a",
      rating: 3,
      comment:
        "Management is responsive and location is great, but the cleanliness in bathrooms and hallways should be improved. Parking was also very limited on busy days.",
      postedAt: "2025-07-10T09:15:00.000Z",
      isVerified: true,
      booking: "687a908aadca98b6494c18a1",
      hostel: "687a8a22cc7148c1e78a99c6",
      user: "687a8d8f69d717b002fa06a3",
    },
    {
      _id: "687a9af9880e74a450aef54b",
      rating: 4,
      comment:
        "Nice option for short-term stays in Islamabad. It’s near metro stations and shops. At night, it can get a bit noisy due to nearby cafes, but otherwise a good place.",
      postedAt: "2025-07-14T13:50:00.000Z",
      isVerified: true,
      booking: "687a908aadca98b6494c18a2",
      hostel: "687a8a22cc7148c1e78a99c4",
      user: "687a8d8f69d717b002fa06a6",
    },
  ];
  await Reviews.insertMany(reviewsData);
  console.log("Reviews seeded successfully.");
};

export default seedReviews;
