import Bookings from "../models/bookings.js";

let getBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find()
      .select([
        "roomType",
        "price",
        "paymentMethod",
        "bookingDate",
        "hostel",
        "user",
      ])
      .populate(["hostel", "user"]);
    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
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

let getBooking = async (req, res) => {
  try {
    let id = req.params.id;
    const booking = await Bookings.findById(id)
      .select([
        "roomType",
        "price",
        "paymentMethod",
        "bookingDate",
        "hostel",
        "user",
      ])
      .populate(["hostel", "user"]);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
        data: null,
        error: null, //execution is successfull
      });
    }
    res.status(200).json({
      success: true,
      id: id,
      message: "Booking by ID is fetched successfully",
      data: booking,
      error: null,
    });
  } catch (error) {
    res.status.apply(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: error.message,
    });
  }
};

let putBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Bookings.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate(["hostel", "user"]);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
        data: null,
        error: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
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

let postBookings = async (req, res) => {
  try {
    let { roomType, price, paymentMethod } = req.body;
    let validationErrors = [];
    if (!roomType) {
      validationErrors.push("Room type is required");
    }
    if (!price) {
      validationErrors.push("Price is required");
    }
    if (!paymentMethod) {
      validationErrors.push("Payment Method is required");
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: null,
        error: validationErrors,
      });
    }
    const booking = new Bookings(req.body).populate(["hostel", "user"]);
    await booking.save();
    res.status(201).json({
      success: true,
      message: "Data is created successfully",
      data: booking,
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

let deleteBooking = async (req, res) => {
  try {
    let id = req.params.id;
    const booking = await Bookings.findByIdAndDelete(id).populate([
      "hostel",
      "user",
    ]);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
        data: null,
        error: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: booking,
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

let deleteBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find().populate(["hostel", "user"]);
    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No more data to delete",
        data: null,
        error: null,
      });
    }
    await Bookings.deleteMany();
    res.status(200).json({
      success: true,
      message: "Bookings deleted successfully",
      data: bookings,
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
  getBookings,
  getBooking,
  putBooking,
  postBookings,
  deleteBooking,
  deleteBookings,
};
