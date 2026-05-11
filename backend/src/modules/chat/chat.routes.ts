import { Router } from "express";
import { sendMessage } from "./chat.controller";
import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.post("/message", protect, sendMessage);

export default router;