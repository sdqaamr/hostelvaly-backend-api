import { Hostels } from "../models/hostels.js";

const seedHostels = async () => {
  const count = await Hostels.countDocuments();
  if (count > 0) {
    console.log("Hostels already seeded.");
    return;
  }
  // Example Hostels data (8)
  const hostelData = [
    {
      // 1
      _id: "687a8a22cc7148c1e78a99be",
      name: "Al-Madina Boys Hostel",
      area: "Johar Town",
      address: "Near Emporium Mall, Johar Town, Lahore",
      amenities: ["Wi-Fi", "Laundry", "Mess", "Parking"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aec8",
          type: "cooler",
          description:
            "Spacious room with cooler facility, ideal for summer. Comfortable for students seeking budget-friendly accommodation with basic cooling.",
          monthlyRent: 12000,
          availableRooms: 11,
        },
        {
          _id: "6895cec0f2759ff2d113aec9",
          type: "ac",
          description:
            "Premium room with air conditioning for maximum comfort during hot weather. Best suited for professionals or students who prefer a luxurious stay.",
          monthlyRent: 18000,
          availableRooms: 4,
        },
        {
          _id: "6895cec0f2759ff2d113aeca",
          type: "fan",
          description:
            "Economical option with ceiling fan, suitable for students on a tight budget. Provides a clean and airy environment with essential amenities.",
          monthlyRent: 8000,
          availableRooms: 5,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      description:
        "Located in Johar Town, Lahore, near Emporium Mall, this hostel offers a peaceful and secure environment suitable for both students and professionals. Its prime location provides easy access to shopping centers, restaurants, and public transport, ensuring convenience in daily life. Residents can enjoy a balanced lifestyle with nearby recreational and essential facilities. The surrounding area adds to the comfort and security, making it an ideal living choice.",
      securityCharges: 6000,
      isAvailable: true,
      reviews: ["687a9af9880e74a450aef546"], // 5
      rating: 4.2,
      reviewsCount: 45,
      owner: "687a8d8f69d717b002fa06a4", // Zain Abbas
      bookings: [],
      VisitRequests: ["687a96e9cb59cdc88e6485fe"], // 6
    },
    {
      // 2
      _id: "687a8a22cc7148c1e78a99bf",
      name: "Iqra Boys Hostel",
      area: "DHA",
      address: "Phase 6, DHA, Lahore",
      amenities: ["Wi-Fi", "Parking", "Mess", "CCTV"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aecc",
          type: "cooler",
          description:
            "Room equipped with a cooler, perfect for summer stays. Affordable choice for students needing basic cooling.",
          monthlyRent: 16000,
          availableRooms: 8,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      description:
        "Modern hostel in Phase 6, DHA, Lahore, offering a homely atmosphere complemented by 24/7 security and high-speed internet for a comfortable stay. The location is surrounded by cafes, gyms, and study hubs, providing residents with both convenience and lifestyle options. Ideal for students and professionals, it ensures a balanced mix of work, study, and leisure. Its safe and vibrant neighborhood makes it a perfect choice for modern living.",
      securityCharges: 5000,
      isAvailable: true,
      reviews: [
        "687a9af9880e74a450aef548", // 7
        "687a9af9880e74a450aef54c", // 11
      ],
      rating: 4,
      reviewsCount: 30,
      owner: "687a8d8f69d717b002fa06a1", // Ali Raza
      bookings: [
        "687a908aadca98b6494c1899", // 1
        "687a908aadca98b6494c189b", // 3
      ],
      VisitRequests: ["687a96e9cb59cdc88e6485fa"], // 2
    },
    {
      // 3
      _id: "687a8a22cc7148c1e78a99c0",
      name: "Shaheen Girls Hostel",
      area: "F-8",
      address: "Street 23, F-8, Islamabad",
      amenities: ["Wi-Fi", "Geyser", "Laundry", "CCTV", "Reception"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aece",
          type: "fan",
          description:
            "Economical choice with ceiling fan, perfect for students on a limited budget. Delivers a fresh and tidy living environment with basic amenities.",
          monthlyRent: 7000,
          availableRooms: 6,
        },
        {
          _id: "6895cec0f2759ff2d113aecf",
          type: "cooler",
          description:
            "Cooler room option, best suited for hot days. Great for students looking for a cost-effective stay with comfort.",
          monthlyRent: 13000,
          availableRooms: 9,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      description:
        "Located in F-8, Islamabad, on Street 23, this hostel offers a quiet residential setting with beautiful surroundings that create a peaceful living environment. Its strategic location ensures quick access to educational institutions, making it ideal for students. The area is also close to offices, catering to working professionals seeking convenience. With well-maintained streets and a calm atmosphere, it provides both comfort and accessibility.",
      securityCharges: 4000,
      isAvailable: true,
      reviews: [
        "687a9af9880e74a450aef542", // 1
        "687a9af9880e74a450aef549", // 8
      ],
      rating: 4.5,
      reviewsCount: 22,
      owner: "687a8d8f69d717b002fa06a4", // Zain Abbas
      bookings: ["687a908aadca98b6494c189c"], // 4
      VisitRequests: [
        "687a96e9cb59cdc88e6485f9", // 1
        "687a96e9cb59cdc88e6485fd", // 5
      ],
    },
    {
      // 4
      _id: "687a8a22cc7148c1e78a99c1",
      name: "Comfort Hostel",
      area: "PECHS",
      address: "Block 6, PECHS, Karachi",
      amenities: ["Wi-Fi", "Parking", "Filtered Water", "Mess"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aed1",
          type: "cooler",
          description:
            "Economical accommodation featuring a cooler, providing comfort in warm weather for students.",
          monthlyRent: 12000,
          availableRooms: 10,
        },
        {
          _id: "6895cec0f2759ff2d113aed2",
          type: "ac",
          description:
            "Well-furnished room with AC, offering top comfort in hot weather. Ideal for students or professionals seeking luxury.",
          monthlyRent: 18000,
          availableRooms: 2,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      description:
        "Located in Block 6, PECHS, Karachi, this hostel offers a peaceful and secure environment suitable for both students and professionals. Its prime location ensures easy access to shopping centers, making daily needs convenient to fulfill. The neighborhood is calm and well-maintained, providing a comfortable living experience. Public transport options are nearby, ensuring smooth connectivity across the city.",
      securityCharges: null,
      isAvailable: true,
      reviews: ["687a9af9880e74a450aef547"], // 6
      rating: 4.1,
      reviewsCount: 35,
      owner: "687a8d8f69d717b002fa06a0", // Siddiqa Durrani
      bookings: [],
      VisitRequests: [],
    },
    {
      // 5
      _id: "687a8a22cc7148c1e78a99c2",
      name: "Al-Fateh Girls Hostel",
      area: "Jaranwala Road",
      address: "Near Central Park, Faisalabad",
      amenities: ["Wi-Fi", "Fire Extinguishers", "Laundry", "Gym"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aed4",
          type: "fan",
          description:
            "Affordable option with ceiling fan, suitable for students managing tight budgets. Ensures a clean and airy space with necessary facilities.",
          monthlyRent: 8000,
          availableRooms: 5,
        },
        {
          _id: "6895cec0f2759ff2d113aed5",
          type: "cooler",
          description:
            "Affordable cooler room option ensuring a comfortable stay for students during hot months.",
          monthlyRent: 14000,
          availableRooms: 14,
        },
        {
          _id: "6895cec0f2759ff2d113aed6",
          type: "ac",
          description:
            "Air-conditioned premium room, ensuring a cool and relaxing stay during summers. Perfect for those who prefer comfort and style.",
          monthlyRent: 20000,
          availableRooms: 8,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      description:
        "Located near Central Park on Jaranwala Road, Faisalabad, this hostel offers a secure and comfortable living environment for female students. Its convenient location provides quick access to essential city amenities, making daily life more convenient. The surroundings are peaceful, promoting a safe and focused atmosphere for studies. Public transport is readily available, ensuring easy connectivity to all parts of the city.",
      securityCharges: 4500,
      isAvailable: true,
      reviews: [
        "687a9af9880e74a450aef545", // 4
        "687a9af9880e74a450aef54b", // 10
        "687a9af9880e74a450aef54d", // 12
      ],
      rating: 3.9,
      reviewsCount: 18,
      owner: "687a8d8f69d717b002fa06a1", // Ali Raza
      bookings: [],
      VisitRequests: ["687a96e9cb59cdc88e6485fc"], // 4
    },
    {
      // 6
      _id: "687a8a22cc7148c1e78a99c3",
      name: "Rahat Hostel",
      area: "University Town",
      address: "Near UET Peshawar",
      amenities: ["Wi-Fi", "Mess", "Parking", "Reception"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aed8",
          type: "cooler",
          description:
            "Comfortable student room with cooler, balancing affordability and essential cooling needs.",
          monthlyRent: 12500,
          availableRooms: 9,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      description:
        "Located near UET in University Town, Peshawar, this hostel is ideal for students seeking both comfort and convenience. Its prime location ensures close proximity to major educational institutes, making daily commutes hassle-free. The environment is designed to support a focused and relaxed lifestyle. Public transport options are easily accessible, connecting residents to the rest of the city with ease.",
      securityCharges: 4000,
      isAvailable: false,
      reviews: ["687a9af9880e74a450aef543"], // 2
      rating: 4.3,
      reviewsCount: 40,
      owner: "687a8d8f69d717b002fa06a3",
      bookings: [],
      VisitRequests: [],
    },
    {
      // 7
      _id: "687a8a22cc7148c1e78a99c4",
      name: "Nexus Hostel",
      area: "G-9",
      address: "Street 12, G-9, Islamabad",
      amenities: ["Wi-Fi", "Guest Rooms", "CCTV", "Mess"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aeda",
          type: "fan",
          description:
            "Low-cost room featuring a ceiling fan, ideal for students on restricted budgets. Provides a neat and ventilated atmosphere with essentials.",
          monthlyRent: 7500,
          availableRooms: 7,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      description:
        "Located on Street 12, G-9, Islamabad, this hostel offers a secure and peaceful environment ideal for students. Its location provides quick and convenient access to shopping centers, making daily errands effortless. The calm surroundings create a perfect atmosphere for study and relaxation. Public transport is readily available, ensuring easy travel across the city.",
      securityCharges: 3500,
      isAvailable: true,
      reviews: [],
      rating: 4.4,
      reviewsCount: 27,
      owner: "687a8d8f69d717b002fa06a4", // Zain Abbas
      bookings: ["687a908aadca98b6494c189a"], // 2
      VisitRequests: [],
    },
    {
      // 8
      _id: "687a8a22cc7148c1e78a99c5",
      name: "City View Boys Hostel",
      area: "Garden Town",
      address: "Near Good Earth, Garden Town",
      amenities: ["Wi-Fi", "Mess", "Laundry"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aedc",
          type: "cooler",
          description:
            "Low-cost room with cooler, suitable for students who prefer simple yet comfortable summer living.",
          monthlyRent: 19000,
          availableRooms: 13,
        },
        {
          _id: "6895cec0f2759ff2d113aedd",
          type: "fan",
          description:
            "Budget option with ceiling fan, designed for students living on limited funds. Offers a simple, airy environment with required amenities.",
          monthlyRent: 8500,
          availableRooms: 7,
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      description:
        "Located near Good Earth, Garden Town, Lahore, this boys’ hostel offers a comfortable living environment with all essential amenities. Its prime location ensures easy access to nearby markets, making daily shopping convenient. The surrounding area is safe and student-friendly, ideal for focused study and rest. Public transport is easily available, ensuring quick connectivity to other parts of the city.",
      securityCharges: 5000,
      isAvailable: true,
      reviews: [
        "687a9af9880e74a450aef544", // 3
        "687a9af9880e74a450aef54a", // 9
      ],
      rating: 4,
      reviewsCount: 20,
      owner: "687a8d8f69d717b002fa06a0", // Siddiqa Durrani
      bookings: [],
      VisitRequests: ["687a96e9cb59cdc88e6485fb"], // 3
    },
  ];
  await Hostels.insertMany(hostelData);
  console.log("Hostels seeded successfully.");
};

export default seedHostels;
