import VisitRequests from "../models/visitRequests.js";
import mongoose from "mongoose";

let getVisitRequests = async (req, res, next) => {
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

let getVisitRequest = async (req, res, next) => {
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

let createVisitRequest = async (req, res, next) => {
  try {
    let { hostel, visitDate, whatsappUpdates } = req.body;
    let validationErrors = [];
    if (!hostel) {
      validationErrors.push("Hostel ID is required");
    }
    if (!visitDate) {
      validationErrors.push("Visit date is required");
    }
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
    let user = req.user;
    let visitRequest = new VisitRequests({
      visitDate,
      whatsappUpdates,
      hostel,
      user: user.id,
    });
    await visitRequest.save();
    await visitRequest.populate("hostel", ["name"]);
    await visitRequest.populate("user", ["fullName", "phone"]),
      res.status(201).json({
        success: true,
        message: "Request created successfully",
        data: visitRequest,
        error: null,
      });
  } catch (error) {
    next(error);
  }
};

let editVisitRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
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
        error: ["Visit Request not found or you are not authorized to update it"],
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

let deleteVisitRequest = async (req, res, next) => {
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
  editVisitRequest,
  deleteVisitRequest,
};
