import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";

export const getRates = async (req: AuthRequest, res: Response) => {
  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY!;
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
    );
    const data = await response.json();

    if (data.result !== "success") throw new Error("Failed to fetch rates");

    const currencies = ['INR', 'AED', 'EUR', 'GBP', 'SGD'];
    const rates: Record<string, number> = {};
    currencies.forEach(c => {
      rates[c] = data.conversion_rates[c];
    });

    res.json({ rates, updatedAt: data.time_last_update_utc });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};