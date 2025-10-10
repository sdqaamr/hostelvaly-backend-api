import { Hostels } from "../models/hostels.js";

const getHostels = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 5);
    const skip = (page - 1) * limit;

    // Todo-Siddiqua: (Done)
    // Add pagination
    // Add select fields to return only specific fields

    //Todo-AR:
    // Add filtering by city, availability, rating, etc.
    // Add sorting by price, rating, etc.
    // Add search by name or description

    const [total, hostels] = await Promise.all([
      Hostels.countDocuments(),
      Hostels.find()
        .skip(skip)
        .limit(limit)
        .populate("owner", ["fullName"])
        .select([
          "name",
          "address",
          "amenities",
          "roomType",
          "rating",
          "owner",
        ]),
    ]);

    res.status(200).json({
      success: true,
      message: "Hostels data fetched successfully",
      data: hostels,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const getHostel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hostel = await Hostels.findById(id)
      .populate("owner", ["fullName"])
      .populate("bookings", ["roomType", "fromDate", "toDate", "user"])
      .populate("visitRequests", ["visitDate", "user"])
      .select([
        "name",
        "address",
        "amenities",
        "roomType",
        "images",
        "description",
        "securityCharges",
        "isAvailable",
        "rating",
        "reviewsCount",
        "owner",
        "bookings",
        "visitRequests",
      ]);
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
        data: null,
        error: ["No hostel exists with the given ID"],
      });
    }
    res.status(200).json({
      success: true,
      message: "Hostel data by ID is fetched successfully",
      data: hostel,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const addNewHostel = async (req, res, next) => {
  try {
    const { name, city } = req.body;
    const validationErrors = [];
    if (!name) {
      validationErrors.push("Hostel name is required");
    }
    if (!city) {
      validationErrors.push("City is required");
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: null,
        error: validationErrors,
      });
    }
    const user = req.user;
    const hostel = new Hostels({ name, city, owner: user.id });
    await hostel.save();
    await hostel.populate("owner", ["fullName", "role"]);
    // ✅ If the creator is a student, update their role to "owner"
    if (user.role === "student") {
      const Users = (await import("../models/users.js")).default;
      await Users.findByIdAndUpdate(user.id, { role: "owner" });
    }
    res.status(200).json({
      success: true,
      message: "Hostel added successfully",
      data: hostel,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const updateHostel = async (req, res, next) => {
  try {
    const hostelId = req.params.id;
    const hostelData = req.body;
    const forbiddenFields = [
      "isAvailable",
      "reviews",
      "rating",
      "reviewsCount",
      "owner",
      "bookings",
      "visitRequests",
      "createdAt",
      "updatedAt",
    ];
    forbiddenFields.forEach((field) => {
      if (field in req.body) {
        delete req.body[field];
      }
    });
    const hostel = await Hostels.findByIdAndUpdate(hostelId, hostelData, {
      new: true,
      runValidators: true,
    })
      .populate("owner", ["fullName"])
      .populate("bookings", ["roomType", "fromDate", "toDate", "user"])
      .populate("visitRequests", ["visitDate", "user"]);
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found or not owned by the user",
        data: null,
        error: ["Hostel not exists with the given ID"],
      });
    }
    res.status(200).json({
      success: true,
      message: "Hostel data updated successfully",
      data: hostel,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const toggleHostelAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Fetch hostel
    const hostel = await Hostels.findById(id);
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
        data: null,
        error: ["No hostel exists with the given ID"],
      });
    }
    // Toggle availability
    hostel.isAvailable = !hostel.isAvailable;
    await hostel.save();

    res.status(200).json({
      success: true,
      message: `Hostel availability toggled to ${
        hostel.isAvailable ? "available" : "unavailable"
      }`,
      data: {
        id: hostel._id,
        name: hostel.name,
        city: hostel.city,
        isAvailable: hostel.isAvailable,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHostel = async (req, res, next) => {
  try {
    let id = req.params.id;
    const hostel = await Hostels.findByIdAndDelete(id);
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found or not owned by user",
        data: null,
        error: ["Hostel not exists with the given ID"],
      });
    }
    res.status(200).json({
      success: true,
      message: "Hostel data deleted successfully",
      data: hostel,
      error: null,
    });

  } catch (error) {
    next(error);
  }
};

export {
  getHostels,
  getHostel,
  addNewHostel,
  updateHostel,
  toggleHostelAvailability,
  deleteHostel,
};
