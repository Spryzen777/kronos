import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as transferService from "./transfer.service";

export const sendMoney = async (req: AuthRequest, res: Response) => {
  try {
    const senderId = req.userId!;
    const { recipientEmail, amount } = req.body;
    const transfer = await transferService.sendMoney(senderId, recipientEmail, amount);
    res.json({ message: "Transfer successful", transfer });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const history = await transferService.getHistory(userId);
    res.json({ history });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};