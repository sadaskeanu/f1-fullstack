import { Router } from "express";
import { getWinners } from "../controllers/winnersController";

const router = Router();
router.get("/:year/winners", getWinners);
export default router;
