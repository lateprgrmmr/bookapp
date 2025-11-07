import { Router } from "express";

const router = Router();

router.get("/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    const resp = await fetch(`http://localhost:8001/similar/${bookId}`);
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to get recommendations" });
  }
});

export default router;
