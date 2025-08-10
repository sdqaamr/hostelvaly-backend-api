import Hostels from "../models/hostels.js";

let getHostels = async (req, res) => {
  try {
    const hostels = await Hostels.find();
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
    const hostel = await Hostels.findById(id);
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
      id: id,
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

let putHostel = async (req, res) => {
  try {
    const id = req.params.id;
    const hostel = await Hostels.findByIdAndUpdate(id, req.body, { new: true });
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
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

let postHostel = async (req, res) => {
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
    const hostel = new Hostels(req.body);
    await hostel.save();
    res.status(201).json({
      success: true,
      message: "Data is created successfully",
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

let deleteHostels = async (req, res) => {
  try {
    const hostels = await Hostels.find();
    if (hostels.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No more data to delete",
        data: null,
        error: null,
      });
    }
    await Hostels.deleteMany();
    res.status(200).json({
      success: true,
      message: "All hostels data is deleted successfully",
      data: hostels,
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
    const hostel = await Hostels.findByIdAndDelete(id);
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
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

export {
  getHostels,
  getHostel,
  putHostel,
  postHostel,
  deleteHostels,
  deleteHostel,
};
