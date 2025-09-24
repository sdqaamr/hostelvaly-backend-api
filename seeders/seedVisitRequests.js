const seedVisitRequests = async () => {
  const module = await import("../models/visitRequests.js");
  const VisitRequests = module.default;
  const count = await VisitRequests.countDocuments();
  if (count > 0) {
    console.log("Visit Requests already seeded.");
    return;
  }
  // Example VisitRequests data (6)
  const visitRequestsData = [
    {
      // 1
      _id: "687a96e9cb59cdc88e6485f9",
      visitDate: "2025-07-18T11:00:00.000Z",
      whatsappUpdates: true,
      notes: "Prefer a tour before noon",
      status: "pending",
      hostel: "687a8a22cc7148c1e78a99c0", // Shaheen Girls Hostel
      user: "687a8d8f69d717b002fa06a1", // Ali Raza
    },
    {
      // 2
      _id: "687a96e9cb59cdc88e6485fa",
      visitDate: "2025-07-20T14:30:00.000Z",
      whatsappUpdates: false,
      notes: "",
      status: "confirmed",
      hostel: "687a8a22cc7148c1e78a99bf", // Iqra Boys Hostel
      user: "687a8d8f69d717b002fa06a3", // Ayesha Siddiqui
    },
    {
      // 3
      _id: "687a96e9cb59cdc88e6485fb",
      visitDate: "2025-07-19T10:00:00.000Z",
      whatsappUpdates: true,
      notes: "Will come with parents",
      status: "pending",
      hostel: "687a8a22cc7148c1e78a99c5", // City View Boys Hostel
      user: "687a8d8f69d717b002fa06a0", // Siddiqa Durrani
    },
    {
      // 4
      _id: "687a96e9cb59cdc88e6485fc",
      visitDate: "2025-07-21T16:00:00.000Z",
      whatsappUpdates: true,
      notes: "",
      status: "confirmed",
      hostel: "687a8a22cc7148c1e78a99c2", // Al-Fateh Girls Hostel
      user: "687a8d8f69d717b002fa06a4", // Zain Abbas
    },
    {
      // 5
      _id: "687a96e9cb59cdc88e6485fd",
      visitDate: "2025-07-18T13:00:00.000Z",
      whatsappUpdates: false,
      notes: "",
      status: "pending",
      hostel: "687a8a22cc7148c1e78a99c0", // Shaheen Girls Hostel
      user: "687a8d8f69d717b002fa06a3", // Ayesha Siddiqui
    },
    {
      // 6
      _id: "687a96e9cb59cdc88e6485fe",
      visitDate: "2025-07-22T11:30:00.000Z",
      whatsappUpdates: true,
      notes: "Rescheduling due to exam",
      status: "cancelled",
      hostel: "687a8a22cc7148c1e78a99be", // Al-Madina Boys Hostel
      user: "687a8d8f69d717b002fa06a1", // Ali Raza
    },
  ];
  await VisitRequests.insertMany(visitRequestsData);
  console.log("Visit Requests seeded successfully.");
};

export default seedVisitRequests;
