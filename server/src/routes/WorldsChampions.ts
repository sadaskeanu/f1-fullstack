import { Router } from "express";
import prisma from "../config/db";

const router = Router();

router.get("/champions", async (_req, res) => {
  const all = await prisma.worldChampion.findMany();
  res.json(all);
});

export default router;
