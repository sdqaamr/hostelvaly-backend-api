const seedHostels = async () => {
  const module = await import("../models/hostels.js");
  const Hostels = module.default;
  const count = await Hostels.countDocuments();
  if (count > 0) {
    console.log("Hostels already seeded.");
    return;
  }
  // Example Hostels data
  const hostelData = [
    {
      _id: "687a8a22cc7148c1e78a99be",
      name: "Al-Madina Boys Hostel",
      city: "Lahore",
      area: "Johar Town",
      address: "Near Emporium Mall, Johar Town, Lahore",
      contact: "+923334445566",
      amenities: ["WiFi", "AC", "Laundry", "Mess", "Parking"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aec8",
          type: "Single",
          price: 12000,
          available: 3,
        },
        {
          _id: "6895cec0f2759ff2d113aec9",
          type: "Double",
          price: 18000,
          available: 2,
        },
        {
          _id: "6895cec0f2759ff2d113aeca",
          type: "Shared",
          price: 8000,
          available: 5,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.2,
      reviewsCount: 45,
      isAvailable: true,
    },
    {
      _id: "687a8a22cc7148c1e78a99bf",
      name: "Iqra Boys Hostel",
      city: "Lahore",
      area: "DHA",
      address: "Phase 6, DHA, Lahore",
      contact: "+923335556677",
      amenities: ["WiFi", "Security", "Mess", "CCTV"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aecc",
          type: "Double",
          price: 16000,
          available: 1,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4,
      reviewsCount: 30,
      isAvailable: true,
    },
    {
      _id: "687a8a22cc7148c1e78a99c0",
      name: "Shaheen Girls Hostel",
      city: "Islamabad",
      area: "F-8",
      address: "Street 23, F-8, Islamabad",
      contact: "+923331112233",
      amenities: ["WiFi", "AC", "Laundry", "Security"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aece",
          type: "Shared",
          price: 7000,
          available: 6,
        },
        {
          _id: "6895cec0f2759ff2d113aecf",
          type: "Single",
          price: 13000,
          available: 2,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.5,
      reviewsCount: 22,
      isAvailable: false,
    },
    {
      _id: "687a8a22cc7148c1e78a99c1",
      name: "Comfort Hostel",
      city: "Karachi",
      area: "PECHS",
      address: "Block 6, PECHS, Karachi",
      contact: "+923338884445",
      amenities: ["WiFi", "AC", "Power Backup", "Mess"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aed1",
          type: "Single",
          price: 12000,
          available: 3,
        },
        {
          _id: "6895cec0f2759ff2d113aed2",
          type: "Double",
          price: 18000,
          available: 2,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.1,
      reviewsCount: 35,
      isAvailable: true,
    },
    {
      _id: "687a8a22cc7148c1e78a99c2",
      name: "Al-Fateh Girls Hostel",
      city: "Faisalabad",
      area: "Jaranwala Road",
      address: "Near Central Park, Faisalabad",
      contact: "+923339996665",
      amenities: ["WiFi", "Security", "Laundry"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aed4",
          type: "Shared",
          price: 8000,
          available: 5,
        },
        {
          _id: "6895cec0f2759ff2d113aed5",
          type: "Single",
          price: 14000,
          available: 3,
        },
        {
          _id: "6895cec0f2759ff2d113aed6",
          type: "Double",
          price: 20000,
          available: 1,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 3.9,
      reviewsCount: 18,
      isAvailable: true,
    },
    {
      _id: "687a8a22cc7148c1e78a99c3",
      name: "Rahat Hostel",
      city: "Peshawar",
      area: "University Town",
      address: "Near UET Peshawar",
      contact: "+923337777888",
      amenities: ["WiFi", "Mess", "Parking"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aed8",
          type: "Single",
          price: 12500,
          available: 4,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.3,
      reviewsCount: 40,
      isAvailable: true,
    },
    {
      _id: "687a8a22cc7148c1e78a99c4",
      name: "Nexus Hostel",
      city: "Islamabad",
      area: "G-9",
      address: "Street 12, G-9, Islamabad",
      contact: "+923332223344",
      amenities: ["WiFi", "AC", "Security", "Mess"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aeda",
          type: "Shared",
          price: 7500,
          available: 7,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.4,
      reviewsCount: 27,
      isAvailable: false,
    },
    {
      _id: "687a8a22cc7148c1e78a99c5",
      name: "City View Boys Hostel",
      city: "Lahore",
      area: "Garden Town",
      address: "Near Good Earth, Garden Town",
      contact: "+923330001122",
      amenities: ["WiFi", "Mess", "Laundry"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aedc",
          type: "Double",
          price: 19000,
          available: 1,
        },
        {
          _id: "6895cec0f2759ff2d113aedd",
          type: "Shared",
          price: 8500,
          available: 4,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4,
      reviewsCount: 20,
      isAvailable: true,
    },
    {
      _id: "687a8a22cc7148c1e78a99c6",
      name: "Bright Future Hostel",
      city: "Karachi",
      area: "Gulistan-e-Jauhar",
      address: "Block 3, Gulistan-e-Jauhar, Karachi",
      contact: "+923331234567",
      amenities: ["WiFi", "AC", "Security"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aedf",
          type: "Single",
          price: 15000,
          available: 2,
        },
        {
          _id: "6895cec0f2759ff2d113aee0",
          type: "Double",
          price: 21000,
          available: 1,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 3.8,
      reviewsCount: 15,
      isAvailable: true,
    },
    {
      _id: "687a8a22cc7148c1e78a99c7",
      name: "University Town Hostel",
      city: "Peshawar",
      area: "University Town",
      address: "Near University Town, Peshawar",
      contact: "+923338800999",
      amenities: ["WiFi", "Mess", "Laundry", "Security"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aee2",
          type: "Single",
          price: 15500,
          available: 3,
        },
        {
          _id: "6895cec0f2759ff2d113aee3",
          type: "Double",
          price: 20000,
          available: 2,
        },
        {
          _id: "6895cec0f2759ff2d113aee4",
          type: "Shared",
          price: 7800,
          available: 6,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.1,
      reviewsCount: 32,
      isAvailable: true,
    },
  ];
  await Hostels.insertMany(hostelData);
  console.log("Hostels seeded successfully.");
};

export default seedHostels;
