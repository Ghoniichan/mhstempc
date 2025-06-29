import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const SEMAPHORE_API_KEY = process.env.SEMAPHORE_API_KEY;

export const send_sms = async (req: Request, res: Response): Promise<void> => {
  const { number, message } = req.body;

  if (!number || !message) {
    res.status(400).json({ error: "Both 'number' and 'message' are required." });
    return;
  }

  try {
    const response = await axios.post(
      "https://api.semaphore.co/api/v4/messages",
      {
        apikey: SEMAPHORE_API_KEY,
        number, // can be comma-separated numbers for bulk send
        message,
      }
    );
    res.json({ result: response.data });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      res.status(500).json({ error: error.response?.data || error.message });
    } else {
      res.status(500).json({ error: error.message || "Unknown error." });
    }
  }
};