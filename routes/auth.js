import express from "express";
const router = express.Router();
import loginLimiter from "../middlewares/rateLimiter.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema } from "../validations/authValidation.js";
import {
  login,
  getCurrentUser,
  refresh,
  logout,
} from "../controllers/authController.js";

import authentication from "../middlewares/authentication.js";
router.post("/login", validate(loginSchema), loginLimiter, login);
router.get("/me", authentication, getCurrentUser);

router.post("/refresh", refresh);
router.post("/logout", authentication, logout);

export default router;
