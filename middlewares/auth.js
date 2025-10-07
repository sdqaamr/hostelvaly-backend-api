import jwt from "jsonwebtoken";
import Reviews from "../models/reviews.js";
import Bookings from "../models/bookings.js";
import VisitRequests from "../models/visitRequests.js";
import Users from "../models/users.js";
import { Hostels } from "../models/hostels.js";

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
        data: null,
        error: ["Token not provided"],
      });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Authentication failed",
            data: null,
            error: [err.message],
          });
        }
        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

// _______________________________________________

const models = {
  Users,
  Hostels,
  Bookings,
  VisitRequests,
  Reviews,
};

/**
 * Role-based and ownership-based authorization middleware.
 */
const authorizeRoles = (rules = {}, modelName = null) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access - user not authenticated",
          data: null,
          error: ["Authentication required"],
        });
      }

      const role = user.role;

      // 🟢 Admin can do anything
      if (role === "admin") return next();

      // 🚫 Role not configured in rules
      if (!(role in rules)) {
        return res.status(403).json({
          success: false,
          message: "Access denied - role not permitted",
          data: null,
          error: ["Your role is not authorized for this action"],
        });
      }

      const accessType = rules[role];

      // 🚫 Explicitly denied
      if (!accessType) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
          data: null,
          error: ["You are not authorized to perform this action"],
        });
      }

      // 🟡 Ownership-based access ("own")
      if (accessType === "own") {
        if (!modelName) {
          return res.status(500).json({
            success: false,
            message: "Ownership check failed - model name not specified",
            data: null,
            error: ["Internal misconfiguration"],
          });
        }

        const Model = models[modelName];
        if (!Model) {
          return res.status(500).json({
            success: false,
            message: `Invalid model reference: ${modelName}`,
            data: null,
            error: ["Ownership check misconfiguration"],
          });
        }

        const resource = await Model.findById(req.params.id)
          .select("user owner")
          .lean();

        if (!resource) {
          return res.status(404).json({
            success: false,
            message: "Resource not found",
            data: null,
            error: ["Invalid or missing resource"],
          });
        }

        // Determine correct owner field dynamically
        const ownerId =
          resource.user?.toString() || resource.owner?.toString() || null;

        if (!ownerId) {
          return res.status(500).json({
            success: false,
            message: "Ownership field missing on resource",
            data: null,
            error: ["Model missing 'user' or 'owner' field"],
          });
        }

        if (ownerId !== user.id) {
          return res.status(403).json({
            success: false,
            message: "Access denied - you can only modify your own data",
            data: null,
            error: ["Not authorized to perform this action"],
          });
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export { verifyToken, authorizeRoles };
