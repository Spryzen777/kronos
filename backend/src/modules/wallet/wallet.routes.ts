import { Router } from "express";
import { getBalance, addMoney } from "./wallet.controller";
import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.get("/balance", protect, getBalance);
router.post("/add-money", protect, addMoney);

export default router;