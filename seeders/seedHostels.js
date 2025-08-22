import { Hostels } from "../models/hostels.js";
const seedHostels = async () => {
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
      amenities: ["Wi-Fi", "Laundry", "Mess", "Parking"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aec8",
          type: "Cooler",
          price: 12000,
          available: 11,
          description:
            "Spacious room with cooler facility, ideal for summer. Comfortable for students seeking budget-friendly accommodation with basic cooling.",
        },
        {
          _id: "6895cec0f2759ff2d113aec9",
          type: "AC",
          price: 18000,
          available: 4,
          description:
            "Premium room with air conditioning for maximum comfort during hot weather. Best suited for professionals or students who prefer a luxurious stay.",
        },
        {
          _id: "6895cec0f2759ff2d113aeca",
          type: "Fan",
          price: 8000,
          available: 5,
          description:
            "Economical option with ceiling fan, suitable for students on a tight budget. Provides a clean and airy environment with essential amenities.",
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.2,
      reviewsCount: 45,
      isAvailable: true,
      user: "687a8d8f69d717b002fa06a1",
      description:
        "Located in Johar Town, Lahore, near Emporium Mall, this hostel offers a peaceful and secure environment suitable for both students and professionals. Its prime location provides easy access to shopping centers, restaurants, and public transport, ensuring convenience in daily life. Residents can enjoy a balanced lifestyle with nearby recreational and essential facilities. The surrounding area adds to the comfort and security, making it an ideal living choice.",
    },
    {
      _id: "687a8a22cc7148c1e78a99bf",
      name: "Iqra Boys Hostel",
      city: "Lahore",
      area: "DHA",
      address: "Phase 6, DHA, Lahore",
      contact: "+923335556677",
      amenities: ["Wi-Fi", "Parking", "Mess", "CCTV"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aecc",
          type: "Cooler",
          price: 16000,
          available: 8,
          description:
            "Room equipped with a cooler, perfect for summer stays. Affordable choice for students needing basic cooling.",
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4,
      reviewsCount: 30,
      isAvailable: true,
      description:
        "Modern hostel in Phase 6, DHA, Lahore, offering a homely atmosphere complemented by 24/7 security and high-speed internet for a comfortable stay. The location is surrounded by cafes, gyms, and study hubs, providing residents with both convenience and lifestyle options. Ideal for students and professionals, it ensures a balanced mix of work, study, and leisure. Its safe and vibrant neighborhood makes it a perfect choice for modern living.",
    },
    {
      _id: "687a8a22cc7148c1e78a99c0",
      name: "Shaheen Girls Hostel",
      city: "Islamabad",
      area: "F-8",
      address: "Street 23, F-8, Islamabad",
      contact: "+923331112233",
      amenities: ["Wi-Fi", "Geyser", "Laundry", "CCTV", "Reception"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aece",
          type: "Fan",
          price: 7000,
          available: 6,
          description:
            "Economical choice with ceiling fan, perfect for students on a limited budget. Delivers a fresh and tidy living environment with basic amenities.",
        },
        {
          _id: "6895cec0f2759ff2d113aecf",
          type: "Cooler",
          price: 13000,
          available: 9,
          description:
            "Cooler room option, best suited for hot days. Great for students looking for a cost-effective stay with comfort.",
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.5,
      reviewsCount: 22,
      isAvailable: false,
      user: "687a8d8f69d717b002fa06a6",
      description:
        "Located in F-8, Islamabad, on Street 23, this hostel offers a quiet residential setting with beautiful surroundings that create a peaceful living environment. Its strategic location ensures quick access to educational institutions, making it ideal for students. The area is also close to offices, catering to working professionals seeking convenience. With well-maintained streets and a calm atmosphere, it provides both comfort and accessibility.",
    },
    {
      _id: "687a8a22cc7148c1e78a99c1",
      name: "Comfort Hostel",
      city: "Karachi",
      area: "PECHS",
      address: "Block 6, PECHS, Karachi",
      contact: "+923338884445",
      amenities: ["Wi-Fi", "Parking", "Filtered Water", "Mess"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aed1",
          type: "Cooler",
          price: 12000,
          available: 10,
          description:
            "Economical accommodation featuring a cooler, providing comfort in warm weather for students.",
        },
        {
          _id: "6895cec0f2759ff2d113aed2",
          type: "AC",
          price: 18000,
          available: 2,
          description:
            "Well-furnished room with AC, offering top comfort in hot weather. Ideal for students or professionals seeking luxury.",
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.1,
      reviewsCount: 35,
      isAvailable: true,
      user: "687a8d8f69d717b002fa06a3",
      description:
        "Located in Block 6, PECHS, Karachi, this hostel offers a peaceful and secure environment suitable for both students and professionals. Its prime location ensures easy access to shopping centers, making daily needs convenient to fulfill. The neighborhood is calm and well-maintained, providing a comfortable living experience. Public transport options are nearby, ensuring smooth connectivity across the city.",
    },
    {
      _id: "687a8a22cc7148c1e78a99c2",
      name: "Al-Fateh Girls Hostel",
      city: "Faisalabad",
      area: "Jaranwala Road",
      address: "Near Central Park, Faisalabad",
      contact: "+923339996665",
      amenities: ["Wi-Fi", "Fire Extinguishers", "Laundry", "Gym"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aed4",
          type: "Fan",
          price: 8000,
          available: 5,
          description:
            "Affordable option with ceiling fan, suitable for students managing tight budgets. Ensures a clean and airy space with necessary facilities.",
        },
        {
          _id: "6895cec0f2759ff2d113aed5",
          type: "Cooler",
          price: 14000,
          available: 14,
          description:
            "Affordable cooler room option ensuring a comfortable stay for students during hot months.",
        },
        {
          _id: "6895cec0f2759ff2d113aed6",
          type: "AC",
          price: 20000,
          available: 8,
          description:
            "Air-conditioned premium room, ensuring a cool and relaxing stay during summers. Perfect for those who prefer comfort and style.",
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 3.9,
      reviewsCount: 18,
      isAvailable: true,
      description:
        "Located near Central Park on Jaranwala Road, Faisalabad, this hostel offers a secure and comfortable living environment for female students. Its convenient location provides quick access to essential city amenities, making daily life more convenient. The surroundings are peaceful, promoting a safe and focused atmosphere for studies. Public transport is readily available, ensuring easy connectivity to all parts of the city.",
    },
    {
      _id: "687a8a22cc7148c1e78a99c3",
      name: "Rahat Hostel",
      city: "Peshawar",
      area: "University Town",
      address: "Near UET Peshawar",
      contact: "+923337777888",
      amenities: ["Wi-Fi", "Mess", "Parking", "Reception"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aed8",
          type: "Cooler",
          price: 12500,
          available: 9,
          description:
            "Comfortable student room with cooler, balancing affordability and essential cooling needs.",
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.3,
      reviewsCount: 40,
      isAvailable: true,
      description:
        "Located near UET in University Town, Peshawar, this hostel is ideal for students seeking both comfort and convenience. Its prime location ensures close proximity to major educational institutes, making daily commutes hassle-free. The environment is designed to support a focused and relaxed lifestyle. Public transport options are easily accessible, connecting residents to the rest of the city with ease.",
    },
    {
      _id: "687a8a22cc7148c1e78a99c4",
      name: "Nexus Hostel",
      city: "Islamabad",
      area: "G-9",
      address: "Street 12, G-9, Islamabad",
      contact: "+923332223344",
      amenities: ["Wi-Fi", "Guest Rooms", "CCTV", "Mess"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aeda",
          type: "Fan",
          price: 7500,
          available: 7,
          description:
            "Low-cost room featuring a ceiling fan, ideal for students on restricted budgets. Provides a neat and ventilated atmosphere with essentials.",
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.4,
      reviewsCount: 27,
      isAvailable: false,
      user: "687a8d8f69d717b002fa06a6",
      description:
        "Located on Street 12, G-9, Islamabad, this hostel offers a secure and peaceful environment ideal for students. Its location provides quick and convenient access to shopping centers, making daily errands effortless. The calm surroundings create a perfect atmosphere for study and relaxation. Public transport is readily available, ensuring easy travel across the city.",
    },
    {
      _id: "687a8a22cc7148c1e78a99c5",
      name: "City View Boys Hostel",
      city: "Lahore",
      area: "Garden Town",
      address: "Near Good Earth, Garden Town",
      contact: "+923330001122",
      amenities: ["Wi-Fi", "Mess", "Laundry"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aedc",
          type: "Cooler",
          price: 19000,
          available: 13,
          description:
            "Low-cost room with cooler, suitable for students who prefer simple yet comfortable summer living.",
        },
        {
          _id: "6895cec0f2759ff2d113aedd",
          type: "Fan",
          price: 8500,
          available: 7,
          description:
            "Budget option with ceiling fan, designed for students living on limited funds. Offers a simple, airy environment with required amenities.",
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4,
      reviewsCount: 20,
      isAvailable: true,
      description:
        "Located near Good Earth, Garden Town, Lahore, this boys’ hostel offers a comfortable living environment with all essential amenities. Its prime location ensures easy access to nearby markets, making daily shopping convenient. The surrounding area is safe and student-friendly, ideal for focused study and rest. Public transport is easily available, ensuring quick connectivity to other parts of the city.",
    },
    {
      _id: "687a8a22cc7148c1e78a99c6",
      name: "Bright Future Hostel",
      city: "Karachi",
      area: "Gulistan-e-Jauhar",
      address: "Block 3, Gulistan-e-Jauhar, Karachi",
      contact: "+923331234567",
      amenities: ["Wi-Fi", "Fire Extinguishers", "Laundry"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aedf",
          type: "Cooler",
          price: 15000,
          available: 9,
          description:
            "Budget-friendly room with cooler facility, offering relief during summer for students.",
        },
        {
          _id: "6895cec0f2759ff2d113aee0",
          type: "AC",
          price: 21000,
          available: 4,
          description:
            "High-end AC room designed for maximum relaxation in warm seasons, suitable for students and working professionals.",
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 3.8,
      reviewsCount: 15,
      isAvailable: true,
      user: "687a8d8f69d717b002fa06a3",
      description:
        "Located in Block 3, Gulistan-e-Jauhar, Karachi, this hostel offers a secure and peaceful environment for students. Its location ensures easy access to essential city facilities, making daily life convenient. The peaceful surroundings provide a comfortable atmosphere for studying and resting. Public transport options are nearby, ensuring smooth connectivity to other parts of the city.",
    },
    {
      _id: "687a8a22cc7148c1e78a99c7",
      name: "University Town Hostel",
      city: "Peshawar",
      area: "University Town",
      address: "Near University Town, Peshawar",
      contact: "+923338800999",
      amenities: ["Wi-Fi", "Mess", "Laundry", "CCTV", "Common Lounge"],
      roomType: [
        {
          _id: "6895cec0f2759ff2d113aee2",
          type: "Cooler",
          price: 15500,
          available: 10,
          description:
            "Cooler room option, best suited for hot days. Great for students looking for a cost-effective stay with comfort.",
        },
        {
          _id: "6895cec0f2759ff2d113aee3",
          type: "AC",
          price: 20000,
          available: 3,
          description:
            "Luxury room with air conditioning, providing relief in hot weather. Best choice for those who value comfort.",
        },
        {
          _id: "6895cec0f2759ff2d113aee4",
          type: "Fan",
          price: 7800,
          available: 6,
          description:
            "Economical stay with ceiling fan, suitable for students on small budgets. Provides a tidy and airy space with basic comforts included.",
        },
      ],
      images: [
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
        "https://tse2.mm.bing.net/th?id=OIP.ix8gl1euNehctcXK-QTxFwHaE7&pid=Api&P=0&h=220",
      ],
      rating: 4.1,
      reviewsCount: 32,
      isAvailable: true,
      description:
        "Located near University Town, Peshawar, this hostel offers a comfortable stay with all basic amenities. It provides easy access to nearby universities, making it ideal for students. The environment is peaceful and conducive for study and rest. Public transport is readily available, ensuring convenient travel across the city.",
    },
  ];
  await Hostels.insertMany(hostelData);
  console.log("Hostels seeded successfully.");
};

export default seedHostels;
