import type { Request, Response } from "express";
import { Router } from "express";
import { createLibrary, getLibraries } from "./api";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const db = req.db;
  const libraries = await getLibraries(db);
  return res.json(libraries);
});

router.post("/", async (req: Request, res: Response) => {
  const { userId, name, description } = req.body;
  const db = req.db;
  const newLibrary = await createLibrary(
    db,
    parseInt(userId),
    name,
    description
  );
  console.log(newLibrary);
  res.json(newLibrary);
});

export default router;
