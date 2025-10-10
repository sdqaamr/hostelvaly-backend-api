import VisitRequests from "../models/visitRequests.js";
import { Hostels } from "../models/hostels.js";
import mongoose from "mongoose";

const getVisitRequests = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 5);
    const skip = (page - 1) * limit;
    const [total, visitRequests] = await Promise.all([
      VisitRequests.countDocuments(),
      VisitRequests.find()
        .skip(skip)
        .limit(limit)
        .populate("hostel", ["name"])
        .populate("user", ["fullName", "phone"]),
    ]);
    res.status(200).json({
      success: true,
      message: "VisitRequests fetched successfully",
      data: visitRequests,
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

const getVisitRequest = async (req, res, next) => {
  try {
    let id = req.params.id;
    const visitRequest = await VisitRequests.findById(id)
      .populate("hostel", ["name"])
      .populate("user", ["fullName", "phone"]);
    if (!visitRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
        data: null,
        error: ["Visit Request not exists with the given ID"],
      });
    }
    res.status(200).json({
      success: true,
      id: id,
      message: "Request fetched successfully",
      data: visitRequest,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const createVisitRequest = async (req, res, next) => {
  try {
    let { hostel, visitDate } = req.body;
    let validationErrors = [];

    if (!hostel) validationErrors.push("Hostel ID is required");
    if (!visitDate) validationErrors.push("Visit date is required");

    // Check if hostel is a valid ObjectId
    if (hostel && !mongoose.Types.ObjectId.isValid(hostel)) {
      validationErrors.push("Hostel ID is not a valid ObjectId");
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: null,
        error: validationErrors,
      });
    }
    // Check hostel availability before creating request
    const foundHostel = await Hostels.findById(hostel).select(
      "isAvailable name"
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
        message: `Hostel "${foundHostel.name}" is currently not available for visit requests`,
        data: null,
        error: ["Hostel is unavailable for visits"],
      });
    }
    // Create visit request
    let user = req.user;
    let visitRequest = new VisitRequests({
      visitDate,
      hostel,
      user: user.id,
    });
    await visitRequest.save();
    await visitRequest.populate([
      { path: "hostel", select: "name isAvailable" },
      { path: "user", select: "fullName phone" },
    ]);
    res.status(201).json({
      success: true,
      message: "Visit request created successfully",
      data: visitRequest,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const toggleWhatsappUpdates = async (req, res, next) => {
  try {
    const requestId = req.params.id;

    const visitRequest = await VisitRequests.findById(requestId);
    if (!visitRequest) {
      return res.status(404).json({
        success: false,
        message: "Visit Request not found",
        data: null,
        error: ["Invalid request ID"],
      });
    }
    // Toggle true/false
    visitRequest.whatsappUpdates = !visitRequest.whatsappUpdates;
    await visitRequest.save();

    res.status(200).json({
      success: true,
      message: `Whatsapp updates toggled to ${visitRequest.whatsappUpdates}`,
      data: {
        id: visitRequest._id,
        whatsappUpdates: visitRequest.whatsappUpdates,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const toggleRequestStatus = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body; // optional, you can pass next state manually
    const user = req.user;
    const request = await VisitRequests.findById(requestId)
      .populate("hostel", "owner name")
      .populate("user", "fullName role");
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Visit Request not found",
        data: null,
        error: ["Invalid request ID"],
      });
    }
    // Authorization logic
    if (
      user.role !== "admin" &&
      request.user._id.toString() !== user.id &&
      request.hostel?.owner?.toString() !== user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to change this visit-request status",
        data: null,
        error: ["Permission denied"],
      });
    }
    // Define allowed transitions
    const transitions = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["pending", "cancelled"],
      cancelled: ["pending", "confirmed"],
    };
    const currentStatus = request.status;
    let newStatus = status;
    if (!newStatus) {
      // Auto toggle logic (for simple toggles without manual input)
      if (currentStatus === "pending") newStatus = "confirmed";
      else if (currentStatus === "confirmed") newStatus = "pending";
      else newStatus = "pending"; // from cancelled → pending
    }
    // Validate transition
    if (!transitions[currentStatus].includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status transition from ${currentStatus} to ${newStatus}`,
        data: null,
        error: ["Invalid status change"],
      });
    }
    request.status = newStatus;
    await request.save();

    res.status(200).json({
      success: true,
      message: `Visit request status updated successfully to "${newStatus}"`,
      data: {
        id: request._id,
        status: request.status,
        user: request.user.fullName,
        hostel: request.hostel?.name,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const editVisitRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const forbiddenFields = [
      "status",
      "user",
      "hostel",
      "whatsappUpdates",
      "createdAt",
      "updatedAt",
    ];
    forbiddenFields.forEach((field) => {
      if (field in req.body) {
        delete req.body[field];
      }
    });
    const visitRequest = await VisitRequests.findByIdAndUpdate(
      requestId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate({
        path: "hostel",
        select: "name",
      })
      .populate({
        path: "user",
        select: "fullName",
        select: "phone",
      });
    if (!visitRequest) {
      return res.status(404).json({
        success: false,
        message: "Request can't be updated",
        data: null,
        error: [
          "Visit Request not found or you are not authorized to update it",
        ],
      });
    }
    res.status(200).json({
      success: true,
      message: "Request updated successfully",
      data: visitRequest,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVisitRequest = async (req, res, next) => {
  try {
    let id = req.params.id;
    const visitRequest = await VisitRequests.findByIdAndDelete(id);
    if (!visitRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
        data: null,
        error: ["Visit Request not exists with the given ID"],
      });
    }
    res.status(200).json({
      success: true,
      message: "Request deleted successfully",
      data: visitRequest,
      error: null,
    });
    
  } catch (error) {
    next(error);
  }
};

export {
  getVisitRequests,
  getVisitRequest,
  createVisitRequest,
  toggleWhatsappUpdates,
  toggleRequestStatus,
  editVisitRequest,
  deleteVisitRequest,
};
