import express from "express";
const router = express.Router();

import { createCourse } from "../controllers/coursesController.js";
import authentication from "../middlewares/authentication.js";
import authorize from "../middlewares/authorize.js";
import {
  assignCourse,
  getMyCourses,
} from "../controllers/coursesController.js";

// admin only
router.post("/", authentication, authorize("admin"), createCourse);
router.post("/assign", authentication, authorize("admin"), assignCourse);
router.get("/my", authentication, getMyCourses);
export default router;
