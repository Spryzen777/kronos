import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as walletService from "./wallet.service";

export const getBalance = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const wallet = await walletService.getBalance(userId);
    res.json({ balance: wallet.balance });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const addMoney = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { amount } = req.body;
    const wallet = await walletService.addMoney(userId, amount);
    res.json({ message: "Money added", balance: wallet.balance });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};