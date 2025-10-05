import jwt from "jsonwebtoken";

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

// _________________________________________________________________

import Reviews from "../models/reviews.js";
import Bookings from "../models/bookings.js";
import VisitRequests from "../models/visitRequests.js";

// Define all models here once
const models = {
  Reviews,
  Bookings,
  VisitRequests,
};

/**
 * Role-based and ownership-based authorization middleware.
 *
 * @param {Object} rules - Defines which roles can access the route.
 * Example:
 *   authorizeRoles({ admin: true, owner: "own", student: false })
 *   authorizeRoles({ admin: true, owner: true, student: "own" })
 * @param {String} [modelName] - Optional model name for ownership check (e.g. "Reviews", "Bookings").
 */
const authorizeRoles = (rules = {}, modelName = null) => {
  return async (req, res, next) => {
    try {
      const user = req.user; // from verifyToken middleware
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
      if (role === "admin") {
        return next();
      }

      // 🚫 Role not included in rules
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

      // 🟡 Handle "own" access → ownership-based check
      if (accessType === "own") {
        if (!modelName) {
          return res.status(500).json({
            success: false,
            message:
              "Ownership check failed - model name not specified in authorizeRoles()",
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

        const resourceId = req.params.id;
        const resource = await Model.findById(resourceId).select("user");

        if (!resource) {
          return res.status(404).json({
            success: false,
            message: "Resource not found",
            data: null,
            error: ["Invalid or missing resource"],
          });
        }

        if (resource.user.toString() !== user.id) {
          return res.status(403).json({
            success: false,
            message: "Access denied - you can only modify your own data",
            data: null,
            error: ["Not authorized to perform this action"],
          });
        }
      }

      // ✅ Passed all checks
      next();
    } catch (error) {
      next(error);
    }
  };
};

export { verifyToken, authorizeRoles };

// const adminOnly = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({
//       success: false,
//       message: "Access denied: Admins only",
//       data: null,
//       error: ["You are not authorized to perform this action"],
//     });
//   }
//   next();
// };
