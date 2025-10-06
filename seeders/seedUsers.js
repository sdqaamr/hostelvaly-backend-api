const seedUsers = async () => {
  const module = await import("../models/users.js");
  const Users = module.default;
  const count = await Users.countDocuments();
  if (count > 0) {
    console.log("Users already seeded.");
    return;
  }
  // Example Users data (8)
  const usersData = [
    {
      // 1
      _id: "687a8d8f69d717b002fa06a0",
      fullName: "Siddiqa Durrani",
      email: "siddiqadurrani@gmail.com",
      role: "admin",
      password: "$2b$10$5DwNKZfpLg25.ttRsASjnuTjDwU9V0lXQs.VS7xxSBRkmaHlZdyla", // pswdsiddiqa
      profilePicture: {
        url: "https://res.cloudinary.com/djr88us3q/image/upload/v1759763922/xivirhvfjzx8omplxvbj.webp",
        publicId: "xivirhvfjzx8omplxvbj",
      },
      phone: "+923338884900",
      city: "Multan",
      gender: "female",
      otp: null,
      otpExpiresIn: null,
      status: "active",
      favorites: [
        "687a8a22cc7148c1e78a99c1", // Comfort Hostel
        "687a8a22cc7148c1e78a99bf", // Iqra Boys Hostel
      ],
      hostelsOwned: [
        "687a8a22cc7148c1e78a99c1", // Comfort Hostel
        "687a8a22cc7148c1e78a99c5", // City View Boys Hostel
      ],
      visitRequests: ["687a96e9cb59cdc88e6485fb"], // 3
      reviewsPosted: [
        "687a9af9880e74a450aef54a", // 9
        "687a9af9880e74a450aef54c", // 11
      ],
    },
    {
      // 2
      _id: "687a8d8f69d717b002fa06a1",
      fullName: "Ali Raza",
      email: "ali.raza@gmail.com",
      role: "owner",
      password: "$2b$10$p7hAxJlIOf5gZRCKPc0iQ.uLHQYCAKFaioGt/HHq2AjvzYAAstwpS", // pswdraza
      profilePicture: {
        url: "https://res.cloudinary.com/djr88us3q/image/upload/v1759763922/xivirhvfjzx8omplxvbj.webp",
        publicId: "xivirhvfjzx8omplxvbj",
      },
      phone: "+923336667788",
      city: "Lahore",
      gender: "male",
      otp: null,
      otpExpiresIn: null,
      status: "active",
      favorites: [
        "687a8a22cc7148c1e78a99bf", // Iqra Boys Hostel
        "687a8a22cc7148c1e78a99c2", // Al-Fateh Girls Hostel
      ],
      hostelsOwned: [
        "687a8a22cc7148c1e78a99bf", // Iqra Boys Hostel
        "687a8a22cc7148c1e78a99c2", // Al-Fateh Girls Hostel
      ],
      bookings: "687a908aadca98b6494c189c", // 4
      visitRequests: [
        "687a96e9cb59cdc88e6485f9", // 1
        "687a96e9cb59cdc88e6485fe", // 6
      ],
      reviewsPosted: ["687a9af9880e74a450aef542"], // 1
    },
    {
      // 3
      _id: "687a8d8f69d717b002fa06a2",
      fullName: "Muhammad Imran",
      email: "imran.uet@gmail.com",
      role: "student",
      password: "$2b$10$RErto8RkzEZr1wiL0.n9/OjmlW8P2JyCYV4ozDP/oMlZq.UsULG.e", // pswdimran
      profilePicture: {
        url: "https://res.cloudinary.com/djr88us3q/image/upload/v1759763922/xivirhvfjzx8omplxvbj.webp",
        publicId: "xivirhvfjzx8omplxvbj",
      },
      phone: "+923337551234",
      city: "Peshawar",
      gender: "male",
      otp: null,
      otpExpiresIn: null,
      status: "banned",
      favorites: ["687a8a22cc7148c1e78a99be"], // Al-Madina Boys Hostel
      hostelsOwned: [],
      visitRequests: [],
      reviewsPosted: [
        "687a9af9880e74a450aef545", // 4
        "687a9af9880e74a450aef547", // 6
        "687a9af9880e74a450aef544", // 3
      ],
    },
    {
      // 4
      _id: "687a8d8f69d717b002fa06a3",
      fullName: "Ayesha Siddiqui",
      email: "ayesha.s@gmail.com",
      role: "student",
      password: "$2b$10$ZXPH0uiE.fsOBogmd2Jf5.GEYZ.nUYZdSeJo5fqZYNIq1rkrsWuN6", // pswdayesha
      profilePicture: {
        url: "https://res.cloudinary.com/djr88us3q/image/upload/v1759763922/xivirhvfjzx8omplxvbj.webp",
        publicId: "xivirhvfjzx8omplxvbj",
      },
      phone: "+923331119988",
      city: "Karachi",
      gender: "female",
      otp: null,
      otpExpiresIn: null,
      status: "active",
      favorites: [
        "687a8a22cc7148c1e78a99bf", // Iqra Boys Hostel
        "687a8a22cc7148c1e78a99c3", // Rahat Hostel
        "687a8a22cc7148c1e78a99c4", // Nexus Hostel
      ],
      hostelsOwned: [],
      bookings: "687a908aadca98b6494c1899", // 1
      visitRequests: [
        "687a96e9cb59cdc88e6485fa", // 2
        "687a96e9cb59cdc88e6485fd", // 5
      ],
      reviewsPosted: ["687a9af9880e74a450aef549"], // 8
    },
    {
      // 5
      _id: "687a8d8f69d717b002fa06a4",
      fullName: "Zain Abbas",
      email: "zain.abbas@yahoo.com",
      role: "owner",
      password: "$2b$10$m85jByMht8abcJMQQS8p8us9Wn9PvXMXlQ5fE65ld4m6QG5NcuxdO", // pswdzain
      profilePicture: {
        url: "https://res.cloudinary.com/djr88us3q/image/upload/v1759763922/xivirhvfjzx8omplxvbj.webp",
        publicId: "xivirhvfjzx8omplxvbj",
      },
      phone: "+923334556677",
      city: "Faisalabad",
      gender: "male",
      otp: null,
      otpExpiresIn: null,
      status: "active",
      favorites: [
        "687a8a22cc7148c1e78a99be", // Al-Madina Boys Hostel
        "687a8a22cc7148c1e78a99c0", // Shaheen Girls Hostel
        "687a8a22cc7148c1e78a99c4", // Nexus Hostel
      ],
      hostelsOwned: [
        "687a8a22cc7148c1e78a99be", // Al-Madina Boys Hostel
        "687a8a22cc7148c1e78a99c0", // Shaheen Girls Hostel
        "687a8a22cc7148c1e78a99c4", // Nexus Hostel
      ],
      visitRequests: ["687a96e9cb59cdc88e6485fc"], // 4
      reviewsPosted: [
        "687a9af9880e74a450aef543", // 2
        "687a9af9880e74a450aef546", // 5
      ],
    },
    {
      // 6
      _id: "687a8d8f69d717b002fa06a5",
      fullName: "Sara Ahmed",
      email: "sara.ahmed@gmail.com",
      role: "student",
      password: "$2b$10$aN/aS3hy3kfvy4.u7oqZRO9FZjFQgIL.88oBT3nuDqB0EUKYCvYvu", // pswdsara
      profilePicture: {
        url: "https://res.cloudinary.com/djr88us3q/image/upload/v1759763922/xivirhvfjzx8omplxvbj.webp",
        publicId: "xivirhvfjzx8omplxvbj",
      },
      phone: "+923335667788",
      city: "Lahore",
      gender: "female",
      otp: "4321",
      otpExpiresIn: "2025-04-30T14:05:00.000Z",
      status: "inactive",
      favorites: [],
      hostelsOwned: [],
      visitRequests: [],
      reviewsPosted: [
        "687a9af9880e74a450aef548", // 7
        "687a9af9880e74a450aef54d", // 12
      ],
    },
    {
      // 7
      _id: "687a8d8f69d717b002fa06a6",
      fullName: "Bilal Tariq",
      email: "bilal.tariq@outlook.com",
      role: "student",
      password: "$2b$10$qoEZgwoVto.JD/EiLnHyRO7ZUAkfZKUpQ.2Wfz6XcRfbWcXBCG7h2", // pswdbilal
      profilePicture: {
        url: "https://res.cloudinary.com/djr88us3q/image/upload/v1759763922/xivirhvfjzx8omplxvbj.webp",
        publicId: "xivirhvfjzx8omplxvbj",
      },
      phone: "+923339994433",
      city: "Islamabad",
      gender: "male",
      otp: null,
      otpExpiresIn: null,
      status: "active",
      favorites: [],
      hostelsOwned: ["687a8a22cc7148c1e78a99c0", "687a8a22cc7148c1e78a99c4"],
      bookings: "687a908aadca98b6494c189a", // 2
      visitRequests: [],
      reviewsPosted: [],
    },
    {
      // 8
      _id: "687a8d8f69d717b002fa06a7",
      fullName: "Hina Noor",
      email: "hina.noor@gmail.com",
      role: "student",
      password: "$2b$10$iOyVVNaJcBy5aQB3dt81UOhckvkDBDmtmORsktYlOAAvV.pzQH7am", // pswdhina
      profilePicture: {
        url: "https://res.cloudinary.com/djr88us3q/image/upload/v1759763922/xivirhvfjzx8omplxvbj.webp",
        publicId: "xivirhvfjzx8omplxvbj",
      },
      phone: "+923332223366",
      city: "Karachi",
      gender: "female",
      otp: null,
      otpExpiresIn: null,
      status: "active",
      favorites: [],
      hostelsOwned: [],
      bookings: "687a908aadca98b6494c189b", // 3
      visitRequests: [
        "687a96e9cb59cdc88e6485fb", // 3
        "687a96e9cb59cdc88e6485f9", // 1
        "687a96e9cb59cdc88e6485fe", // 6
      ],
      reviewsPosted: ["687a9af9880e74a450aef54b"], // 10
    },
  ];
  await Users.insertMany(usersData);
  console.log("Users seeded successfully.");
};

export default seedUsers;
