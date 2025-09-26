import VisitRequests from "../models/visitRequests.js";

let getVisitRequests = async (req, res, next) => {
  try {
    const visitRequests = await VisitRequests.find()
      .select([
        "fullName",
        "phone",
        "whatsappUpdates",
        "visitDate",
        "hostel",
        "user",
      ])
      .populate({
        path: "hostel",
        select: "name",
      })
      .populate({
        path: "user",
        select: "fullName",
      });
    res.status(200).json({
      success: true,
      message: "VisitRequests fetched successfully",
      data: visitRequests,
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
      .select([
        "fullName",
        "phone",
        "whatsappUpdates",
        "visitDate",
        "hostel",
        "user",
      ])
      .populate({
        path: "hostel",
        select: "name",
      })
      .populate({
        path: "user",
        select: "fullName",
      });
    if (!visitRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
        data: null,
        error: null, //execution is successfull
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
    let { hostel, fullName, phone, visitDate, whatsappUpdates, user } =
      req.body;
    let validationErrors = [];
    if (!fullName) {
      validationErrors.push("Full name is required");
    }
    if (!phone) {
      validationErrors.push("Phone number is required");
    }
    if (!visitDate) {
      validationErrors.push("Visit date is required");
    }
    if (!hostel) {
      validationErrors.push("Hostel ID is required");
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: null,
        error: validationErrors,
      });
    }
    let visitRequest = new VisitRequests({
      fullName,
      phone,
      visitDate,
      whatsappUpdates,
      hostel,
      user,
    });
    await visitRequest.save();
    await visitRequest.populate([
      { path: "hostel", select: "name" },
      { path: "user", select: "fullName" },
    ]);
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
    const id = req.params.id;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null,
        error: null,
      });
    }
    const visitRequest = await VisitRequests.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate({
        path: "hostel",
        select: "name",
      })
      .populate({
        path: "user",
        select: "fullName",
      });
    if (!visitRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
        data: null,
        error: null,
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

let cancelVisitRequest = async (req, res, next) => {
  try {
    let id = req.params.id;
    const visitRequest = await VisitRequests.findByIdAndDelete(id).populate([
      "hostel",
      "user",
    ]);
    if (!visitRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
        data: null,
        error: null,
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

let deleteVisitRequests = async (req, res, next) => {
  try {
    const visitRequests = await VisitRequests.find().populate([
      { path: "hostel", select: "name" },
      { path: "user", select: "fullName" },
    ]);
    if (visitRequests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No more data to delete",
        data: null,
        error: null,
      });
    }
    await VisitRequests.deleteMany();
    res.status(200).json({
      success: true,
      message: "Requests deleted successfully",
      data: visitRequests,
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
  cancelVisitRequest,
  deleteVisitRequests,
};
