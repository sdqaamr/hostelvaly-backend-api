import VisitRequests from "../models/visitRequests.js";

let getVisitRequests = async (req, res) => {
  try {
    const visitRequests = await VisitRequests.find()
      .select([
        "fullName",
        "phone",
        "dob",
        "whatsappUpdates",
        "visitDate",
        "hostel",
        "user",
      ])
      .populate(["hostel", "user"]);
    res.status(200).json({
      success: true,
      message: "VisitRequests fetched successfully",
      data: visitRequests,
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

let getVisitRequest = async (req, res) => {
  try {
    let id = req.params.id;
    const visitRequest = await VisitRequests.findById(id)
      .select([
        "fullName",
        "phone",
        "dob",
        "whatsappUpdates",
        "visitDate",
        "hostel",
        "user",
      ])
      .populate(["hostel", "user"]);
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
    res.status.apply(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
      error: error.message,
    });
  }
};

let putVisitRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const visitRequest = await VisitRequests.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate(["hostel", "user"]);
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};

let postVisitRequests = async (req, res) => {
  try {
    let { fullName, phone } = req.body;
    let validationErrors = [];
    if (!fullName) {
      validationErrors.push("Full name is required");
    }
    if (!phone) {
      validationErrors.push("Phone number is required");
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: null,
        error: validationErrors,
      });
    }
    const visitRequest = new VisitRequests(req.body).populate([
      "hostel",
      "user",
    ]);
    await visitRequest.save();
    res.status(201).json({
      success: true,
      message: "Request created successfully",
      data: visitRequest,
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

let deleteVisitRequest = async (req, res) => {
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};

let deleteVisitRequests = async (req, res) => {
  try {
    const visitRequests = await VisitRequests.find().populate([
      "hostel",
      "user",
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
};

export {
  getVisitRequests,
  getVisitRequest,
  putVisitRequest,
  postVisitRequests,
  deleteVisitRequest,
  deleteVisitRequests,
};
