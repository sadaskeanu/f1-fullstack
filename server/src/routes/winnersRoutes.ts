import { Router } from "express";
import { getWinners } from "../controllers/winnersController";
import { validate } from "../middleware/validate";
import { yearParamSchema } from "../validation/paramSchemas";

const router = Router();
router.get("/:year/winners", validate(yearParamSchema, "params"), getWinners);
export default router;
