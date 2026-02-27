import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the authentication API",
  });
});

router.post("/login", login);
router.post("/register", register);

export default router;
