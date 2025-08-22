import rateLimit from "express-rate-limit";

const apiRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

export { apiRateLimit };
