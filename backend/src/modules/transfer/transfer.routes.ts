import { Router } from "express";
import { sendMoney, getHistory } from "./transfer.controller";
import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.post("/send", protect, sendMoney);
router.get("/history", protect, getHistory);

export default router;