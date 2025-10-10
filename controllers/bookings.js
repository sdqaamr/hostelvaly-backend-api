import { Hostels } from "../models/hostels.js";
import mongoose from "mongoose";
import Bookings from "../models/bookings.js";

const getBookings = async (req, res, next) => {
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

const getBooking = async (req, res, next) => {
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

const addBooking = async (req, res, next) => {
  try {
    const { roomType, hostel, fromDate, toDate, totalAmount } = req.body;
    const validationErrors = [];

    // Validation checks
    if (!roomType) validationErrors.push("Room type is required");
    if (!hostel) validationErrors.push("Hostel ID is required");
    if (!fromDate) validationErrors.push("From date is required");
    if (!toDate) validationErrors.push("To date is required");
    if (!totalAmount) validationErrors.push("Total amount is required");

    if (hostel && !mongoose.Types.ObjectId.isValid(hostel))
      validationErrors.push("Hostel ID is not a valid ObjectId");
    if (roomType && !mongoose.Types.ObjectId.isValid(roomType))
      validationErrors.push("RoomType ID is not a valid ObjectId");

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: null,
        error: validationErrors,
      });
    }
    // Check hostel availability
    const foundHostel = await Hostels.findById(hostel).select(
      "isAvailable name roomType"
    );
    if (!foundHostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
        data: null,
        error: ["Invalid hostel ID"],
      });
    }
    if (!foundHostel.isAvailable) {
      return res.status(400).json({
        success: false,
        message: `Hostel "${foundHostel.name}" is currently not available for booking`,
        data: null,
        error: ["Hostel is unavailable"],
      });
    }
    // Check if selected roomType belongs to this hostel
    const matchedRoom = foundHostel.roomType?.find(
      (rt) => rt._id.toString() === roomType.toString()
    );
    if (!matchedRoom) {
      return res.status(400).json({
        success: false,
        message: "Invalid room type for this hostel",
        data: null,
        error: ["Room type does not belong to this hostel"],
      });
    }
    // Create booking
    const user = req.user;
    const newBooking = new Bookings({
      roomType,
      user: user.id,
      hostel,
      fromDate,
      toDate,
      totalAmount,
    });
    await newBooking.save();
    // Populate response
    const booking = await Bookings.findById(newBooking._id)
      .populate("roomType", ["type", "monthlyRent"])
      .populate("hostel", ["name"])
      .populate("user", ["fullName"])
      .lean();

    res.status(201).json({
      success: true,
      message: "Booked hostel successfully",
      data: booking,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const toggleBookingStatus = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body; // optional, you can pass next state manually
    const user = req.user;
    const booking = await Bookings.findById(bookingId)
      .populate("hostel", "owner name")
      .populate("user", "fullName role");
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
        data: null,
        error: ["Invalid booking ID"],
      });
    }
    // 🧩 Authorization logic
    if (
      user.role !== "admin" &&
      booking.user._id.toString() !== user.id &&
      booking.hostel?.owner?.toString() !== user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to change this booking status",
        data: null,
        error: ["Permission denied"],
      });
    }
    // 🧩 Define allowed transitions
    const transitions = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["pending", "cancelled"],
      cancelled: ["pending", "confirmed"],
    };
    const currentStatus = booking.status;
    let newStatus = status;
    if (!newStatus) {
      // Auto toggle logic (for simple toggles without manual input)
      if (currentStatus === "pending") newStatus = "confirmed";
      else if (currentStatus === "confirmed") newStatus = "pending";
      else newStatus = "pending"; // from cancelled → pending
    }
    // 🧩 Validate transition
    if (!transitions[currentStatus].includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status transition from ${currentStatus} to ${newStatus}`,
        data: null,
        error: ["Invalid status change"],
      });
    }
    booking.status = newStatus;
    await booking.save();

    res.status(200).json({
      success: true,
      message: `Booking status updated successfully to "${newStatus}"`,
      data: {
        id: booking._id,
        status: booking.status,
        user: booking.user.fullName,
        hostel: booking.hostel?.name,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const editBooking = async (req, res, next) => {
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

const deleteBooking = async (req, res, next) => {
  try {
    let id = req.params.id;
    const booking = await Bookings.findByIdAndDelete(id);
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
  toggleBookingStatus,
  editBooking,
  deleteBooking,
};
