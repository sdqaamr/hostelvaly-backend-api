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
      .populate({
        path: "hostel",
        select: "name roomType", // get the whole roomType array
      })
      .populate({
        path: "user",
        select: "fullName",
      })
      .lean();
    const result = bookings.map((b) => {
      if (b.hostel?.roomType) {
        const match = b.hostel.roomType.find(
          (rt) => rt._id.toString() === b.roomType.toString()
        );
        b.roomType = match || null; // replace ObjectId with actual roomType object
      }
      return b;
    });
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
      .populate({
        path: "hostel",
        select: "name roomType", // get the whole roomType array
      })
      .populate({
        path: "user",
        select: "fullName",
      })
      .lean();
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
        data: null,
        error: null,
      });
    }
    if (booking.hostel?.roomType) {
      const match = booking.hostel.roomType.find(
        (rt) => rt._id.toString() === booking.roomType.toString()
      );
      booking.roomType = match || null;
    }
    res.status(200).json({
      success: true,
      id: id,
      message: "Booking by ID is fetched successfully",
      data: booking,
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

let addBooking = async (req, res) => {
  try {
    let { roomType, paymentMethod, hostel, fromDate, toDate } = req.body;
    let validationErrors = [];
    if (!roomType) {
      validationErrors.push("Room type is required");
    }
    if (!paymentMethod) {
      validationErrors.push("Payment Method is required");
    }
    if (!hostel) {
      validationErrors.push("Hostel ID is required");
    }
    if (!fromDate) {
      validationErrors.push("From date is required");
    }
    if (!toDate) {
      validationErrors.push("To date is required");
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
    // Create and save booking first
    const newBooking = new Bookings({
      roomType,
      paymentMethod,
      user: user.id,
      hostel,
      fromDate,
      toDate,
    });
    await newBooking.save();
    // Now fetch it with populate
    const booking = await Bookings.findById(newBooking._id)
      .populate({
        path: "hostel",
        select: "name roomType",
      })
      .populate({
        path: "user",
        select: "fullName",
      })
      .lean();
    // Replace roomType ObjectId with matching object
    if (booking.hostel?.roomType) {
      const match = booking.hostel.roomType.find(
        (rt) => rt._id.toString() === booking.roomType.toString()
      );
      booking.roomType = match || null;
    }

    res.status(201).json({
      success: true,
      message: "Booked hostel successfully",
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

let editBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Bookings.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate({
        path: "hostel",
        select: "name roomType", // get the whole roomType array
      })
      .populate({
        path: "user",
        select: "fullName",
      })
      .lean();
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking can't be updated or not found at all",
        data: null,
        error: null,
      });
    }
    // Replace ObjectId roomType with actual object
    if (booking.hostel?.roomType) {
      const match = booking.hostel.roomType.find(
        (rt) => rt._id.toString() === booking.roomType.toString()
      );
      booking.roomType = match || null;
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

let cancelBooking = async (req, res) => {
  try {
    let id = req.params.id;
    let user = req.user; // get the authenticated user from request
    const booking = await Bookings.deleteOne({
      _id: id,
      user: user.id,
    })
      .populate({
        path: "hostel",
        select: "name roomType", // get the whole roomType array
      })
      .populate({
        path: "user",
        select: "fullName",
      })
      .lean();
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
        data: null,
        error: null,
      });
    }
    // now safe to check booking.hostel
    if (booking.hostel?.roomType) {
      const match = booking.hostel.roomType.find(
        (rt) => rt._id.toString() === booking.roomType.toString()
      );
      booking.roomType = match || null;
    }
    if (booking.deletedCount === 0) {
      return res.status(200).json({
        success: false,
        message: "Booking can't be deleted or not exist at all",
        data: null,
        error: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
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
    const bookings = await Bookings.find()
      .populate({
        path: "hostel",
        select: "name roomType", // get the whole roomType array
      })
      .populate({
        path: "user",
        select: "fullName",
      })
      .lean();
    const result = bookings.map((b) => {
      if (b.hostel?.roomType) {
        const match = b.hostel.roomType.find(
          (rt) => rt._id.toString() === b.roomType.toString()
        );
        b.roomType = match || null; // replace ObjectId with actual roomType object
      }
      return b;
    });
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
  addBooking,
  editBooking,
  cancelBooking,
  deleteBookings,
};
