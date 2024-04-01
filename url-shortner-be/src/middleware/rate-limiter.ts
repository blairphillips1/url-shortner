import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: async (req) => {
    if (req.method === "POST") return 10;
    if (req.method === "DELETE") return 10;
    else return 50;
  },
  standardHeaders: "draft-7",
  message: "Rate limit has been hit",
  skipFailedRequests: true,
});
