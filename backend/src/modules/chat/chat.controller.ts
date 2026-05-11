import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as chatService from "./chat.service";

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { message } = req.body;
    if (!message) throw new Error("Message is required");
    const reply = await chatService.sendMessage(message);
    res.json({ reply });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};