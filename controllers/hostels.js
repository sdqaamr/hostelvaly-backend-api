import { Hostels } from "../models/hostels.js";

let getHostels = async (req, res) => {
  try {
    // Todo-Siddiqua:
    // Add pagination
    // Add select fields to return only specific fields

    //Todo-AR:
    // Add filtering by city, availability, rating, etc.
    // Add sorting by price, rating, etc.
    // Add search by name or description
    const hostels = await Hostels.find().populate("owner", ["fullName"]);
    res.status(200).json({
      success: true,
      message: "Hostels data fetched successfully",
      data: hostels,
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

let getHostel = async (req, res) => {
  try {
    let id = req.params.id;
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

let addNewHostel = async (req, res) => {
  try {
    let { name, city, isAvailable } = req.body;
    let validationErrors = [];
    if (!name) {
      validationErrors.push("Hostel name is required");
    }
    if (!city) {
      validationErrors.push("City is required");
    }
    if (!isAvailable) {
      validationErrors.push("isAvailable field is required");
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: null,
        error: validationErrors,
      });
    }
    let user = req.user;
    let hostel = new Hostels({ name, city, isAvailable, owner: user.id });
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

let updateHostel = async (req, res) => {
  try {
    const id = req.params.id;
    let hostelData = req.body;
    let user = req.user;
    let userId = user.id;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null,
        error: null,
      });
    }
    const hostel = await Hostels.findOneAndUpdate(
      {
        _id: id,
        owner: userId, // Ensure the product belongs to authorized user
      },
      hostelData,
      {
        new: true, // Return the updated document
      }
    ).populate("owner", ["fullName"]);
    if (!hostel) {
      return res.status(400).json({
        success: false,
        message: "Hostel can't be updated or not owned by the user",
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

let deleteHostel = async (req, res) => {
  try {
    let id = req.params.id;
    let user = req.user; // get the authenticated user from request
    const hostel = await Hostels.deleteOne({
      _id: id,
      owner: user.id,
    });
    if (hostel.deletedCount === 0) {
      return res.status(200).json({
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
