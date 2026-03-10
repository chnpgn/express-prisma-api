import { Router } from "express";
import { getAllWatchlist, getWatchlistItem, addToWatchlist, updateWatchlistItem, removeFromWatchlist } from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addWatchlistSchema } from "../validators/watchlistValidators.js";

const router = Router();

router.use(authMiddleware)

router.get("/", getAllWatchlist);

router.get("/:id", getWatchlistItem)

router.post("/", validateRequest(addWatchlistSchema), addToWatchlist);

router.put("/:id", updateWatchlistItem)

router.delete("/:id", removeFromWatchlist)

export default router;
