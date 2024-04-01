import express, { Request, Response } from "express";
import {
  createShortURL,
  deleteShortUrlEntry,
  getLongUrl,
} from "../services/url-shortner-service";

export const router = express.Router();

router.post("/post-url", async (req: Request, res: Response) => {
  const { body } = req;
  const response = await createShortURL(body.data);
  res.status(200).send(response);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const longUrl = await getLongUrl(id);
  res.status(301).redirect(longUrl);
});

router.delete("/delete-url", async (req: Request, res: Response) => {
  const { body } = req;
  const response = await deleteShortUrlEntry(body.data);
  if (response === "Short url doesn't exists") {
    res.status(404).send(response);
  } 
  res.status(200).send(response);
});