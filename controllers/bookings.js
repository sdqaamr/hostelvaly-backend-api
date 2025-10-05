import Bookings from "../models/bookings.js";
import mongoose from "mongoose";

let getBookings = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 5);
    const skip = (page - 1) * limit;
    const [total, bookings] = await Promise.all([
      Bookings.countDocuments(),
      Bookings.find()
        .skip(skip)
        .limit(limit)
        .populate("roomType", ["tyoe", "monthlyRent"])
        .populate("hostel", ["name"])
        .populate("user", ["fullName"]),
    ]);
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

let getBooking = async (req, res, next) => {
  try {
    let id = req.params.id;
    const booking = await Bookings.findById(id)
      .populate("roomType", ["type", "monthlyRent"])
      .populate("hostel", ["name"])
      .populate("user", ["fullName"]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
        data: null,
        error: ["Booking not exists with the given ID"],
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
      message: "Booking fetched successfully",
      data: booking,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

let addBooking = async (req, res, next) => {
  try {
    let { roomType, hostel, fromDate, toDate, totalAmount } = req.body;
    let validationErrors = [];
    if (!roomType) {
      validationErrors.push("Room type is required");
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
    if (!totalAmount) {
      validationErrors.push("Total amount is required");
    }
    // Check if hostel is a valid ObjectId
    if (hostel && !mongoose.Types.ObjectId.isValid(hostel)) {
      validationErrors.push("Hostel ID is not a valid ObjectId");
    }
    // Check if roomType is a valid ObjectId
    if (roomType && !mongoose.Types.ObjectId.isValid(roomType)) {
      validationErrors.push("RoomType ID is not a valid ObjectId");
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
      user: user.id,
      hostel,
      fromDate,
      toDate,
      totalAmount,
    });
    await newBooking.save();
    // Now fetch it with populate
    const booking = await Bookings.findById(newBooking._id)
      .populate("roomType", ["tyoe", "monthlyRent"])
      .populate("hostel", ["name"])
      .populate("user", ["fullName"])
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
    error(next);
  }
};

let editBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const forbiddenFields = [
      "status",
      "user",
      "hostel",
      "createdAt",
      "updatedAt",
    ];
    forbiddenFields.forEach((field) => {
      if (field in req.body) {
        delete req.body[field];
      }
    });
    const booking = await Bookings.findByIdAndUpdate(bookingId, req.body, {
      new: true,
      runValidators: true,
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
        error: ["Booking not found or you are not authorized to update it"],
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
    next(error);
  }
};

let deleteBooking = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = req.user; // get the authenticated user from request
    const booking = await Bookings.deleteOne({
      _id: id,
      user: user.id,
    });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
        data: null,
        error: ["Booking not exists with the given ID"],
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
        message: "Booking can't be deleted or not exists at all",
        data: null,
        error: ["Booking not found or you are not authorized to delete it"],
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: booking,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getBookings,
  getBooking,
  addBooking,
  editBooking,
  deleteBooking,
};
