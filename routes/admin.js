import express from "express";
const router = express.Router();

import { createUser } from "../controllers/adminController.js";
import authentication from "../middlewares/authentication.js";
import authorize from "../middlewares/authorize.js";

router.post("/users", authentication, authorize("admin"), createUser);

export default router;
