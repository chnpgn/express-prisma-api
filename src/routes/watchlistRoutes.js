import { Router } from "express";
import { addToWatchlist } from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// router.use(authMiddleware)
router.post("/", authMiddleware, addToWatchlist);

export default router;
