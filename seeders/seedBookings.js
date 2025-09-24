const seedBookings = async () => {
  const module = await import("../models/bookings.js");
  const Bookings = module.default;
  const count = await Bookings.countDocuments();
  if (count > 0) {
    console.log("Bookings already seeded.");
    return;
  }
  // Example Bookings data (4)
  const bookingsData = [
    {
      // 1
      _id: "687a908aadca98b6494c1899",
      roomType: "6895cec0f2759ff2d113aecc", // Cooler
      status: "confirmed",
      totalAmount: 21000,
      paymentMethod: "cash",
      fromDate: "2025-08-01T00:00:00.000Z",
      toDate: "2025-12-31T00:00:00.000Z",
      hostel: "687a8a22cc7148c1e78a99bf", // Iqra Boys Hostel
      user: "687a8d8f69d717b002fa06a3", // Ayesha Siddiqui
    },
    {
      // 2
      _id: "687a908aadca98b6494c189a",
      roomType: "6895cec0f2759ff2d113aeda", // Fan
      status: "pending",
      totalAmount: 11000,
      paymentMethod: "bank transfer",
      fromDate: "2025-09-01T00:00:00.000Z",
      toDate: "2026-01-31T00:00:00.000Z",
      hostel: "687a8a22cc7148c1e78a99c4", // Nexus Hostel
      user: "687a8d8f69d717b002fa06a6", // Bilal Tariq
    },
    {
      // 3
      _id: "687a908aadca98b6494c189b",
      roomType: "6895cec0f2759ff2d113aecc", // Cooler
      status: "confirmed",
      totalAmount: 21000,
      paymentMethod: "bank transfer",
      fromDate: "2025-07-20T00:00:00.000Z",
      toDate: "2025-11-20T00:00:00.000Z",
      hostel: "687a8a22cc7148c1e78a99bf", // Iqra Boys Hostel
      user: "687a8d8f69d717b002fa06a7", // Hina Noor
    },
    {
      // 4
      _id: "687a908aadca98b6494c189c",
      roomType: "6895cec0f2759ff2d113aecf", // Cooler
      status: "cancelled",
      totalAmount: 17000,
      paymentMethod: "cash",
      fromDate: "2025-08-15T00:00:00.000Z",
      toDate: "2025-12-15T00:00:00.000Z",
      hostel: "687a8a22cc7148c1e78a99c0", // Shaheen Girls Hostel
      user: "687a8d8f69d717b002fa06a1", // Ali Raza
    },
  ];
  await Bookings.insertMany(bookingsData);
  console.log("Bookings seeded successfully.");
};

export default seedBookings;
