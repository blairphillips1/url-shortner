import { NextFunction, Request, Response } from "express";
import { isValidUrl } from "../utils/valid-url";

export function requestValidation (req: Request, res: Response, next: NextFunction): void {
  console.log("Request Middleware");
  if (req.method === "GET" || req.method === "DELETE") {
    return next();
  }
  if (req.method === "POST" && isValidUrl(req.body.data)) {
    return next();
  }
  res.status(400).send("Invalid url sent");
};