/**
 * @swagger
 * tags:
 *   name: Seasons
 *   description: Endpoints related to F1 world champion seasons
 */

/**
 * @swagger
 * /seasons:
 *   get:
 *     summary: Get all F1 World Champion seasons
 *     tags: [Seasons]
 *     responses:
 *       200:
 *         description: List of world champions sorted by season
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorldChampion'
 *       500:
 *         description: Server error
 */

import { Router } from "express";
import { getSeasons } from "../controllers/seasonsController";
import { rateLimiter } from "../middleware/rateLimiter";

const router = Router();
router.get("/", rateLimiter, getSeasons);
export default router;
