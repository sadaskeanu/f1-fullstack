/**
 * @swagger
 * tags:
 *   name: Winners
 *   description: Race winners by season
 */

/**
 * @swagger
 * /{year}/winners:
 *   get:
 *     summary: Get all race winners for a specific F1 season
 *     tags: [Winners]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 2005
 *         description: Season year (must be 2005 or later)
 *     responses:
 *       200:
 *         description: List of race winners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RaceChampion'
 *       400:
 *         description: Invalid year parameter
 *       500:
 *         description: Internal server error
 */

import { Router } from "express";
import { getWinners } from "../controllers/winnersController";
import { validate } from "../middleware/validate";
import { yearParamSchema } from "../validation/paramSchemas";
import { rateLimiter } from "../middleware/rateLimiter";

const router = Router();
router.get(
  "/:year/winners",
  rateLimiter,
  validate(yearParamSchema, "params"),
  getWinners
);
export default router;
