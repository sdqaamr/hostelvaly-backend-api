
import { Hostels } from "../models/hostels.js";

const getHostels = async (req, res) => {
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
        .select(["name", "address", "contact", "amenities", "roomType", "owner"])
    ]);

    res.status(200).json({
      success: true,
      message: "Hostels data fetched successfully",
      data: hostels,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: error.message,
    });
  }
};

const getHostel = async (req, res) => {
  try {
  const { id } = req.params;
  const hostel = await Hostels.findById(id).populate("owner", ["fullName"]);
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
        data: null,
        error: null, //execution is successfull
      });
    }
    res.status(200).json({
      success: true,
      message: "Hostel data by ID is fetched successfully",
      data: hostel,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: error.message,
    });
  }
};

const addNewHostel = async (req, res) => {
  try {
  const { name = "", city = "", isAvailable = false } = req.body;
  const validationErrors = [];
    if (!name) {
      validationErrors.push("Hostel name is required");
    }
    if (!city) {
      validationErrors.push("City is required");
    }
      if (typeof isAvailable !== "boolean") {
        validationErrors.push("isAvailable field must be boolean");
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
  const hostel = new Hostels({ name, city, isAvailable, owner: user.id });
  await hostel.save();
  await hostel.populate("owner", ["fullName"]);
    res.status(201).json({
      success: true,
      message: "Hostel added successfully",
      data: hostel,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};

const updateHostel = async (req, res) => {
  try {
  const { id } = req.params;
  const hostelData = req.body;
  const userId = req.user.id;
  if (!hostelData || Object.keys(hostelData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null,
        error: null,
      });
    }
    const hostel = await Hostels.findOneAndUpdate(
      { _id: id, owner: userId },
      hostelData,
      { new: true }
    ).populate("owner", ["fullName"]);
      if (!hostel) {
        return res.status(404).json({
          success: false,
          message: "Hostel not found or not owned by the user",
          data: null,
          error: null,
        });
      }
    res.status(200).json({
      success: true,
      message: "Hostel data updated successfully",
      data: hostel,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};

const deleteHostel = async (req, res) => {
  try {
  const { id } = req.params;
  const userId = req.user.id;
  const hostel = await Hostels.deleteOne({ _id: id, owner: userId });
    if (hostel.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found or not owned by user",
        data: null,
        error: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: hostel,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};

export { getHostels, getHostel, addNewHostel, updateHostel, deleteHostel };
