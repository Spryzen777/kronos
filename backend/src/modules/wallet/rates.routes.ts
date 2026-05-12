import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { getRates } from "./rates.controller";

const router = Router();
router.get("/rates", protect, getRates);

export default router;