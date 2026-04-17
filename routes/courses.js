import express from "express";
const router = express.Router();

import authentication from "../middlewares/authentication.js";
import authorize from "../middlewares/authorize.js";
import {
  assignCourse,
  getMyCourses,
  updateProgress,
  createCourse,
   getAllCourses,
  updateCourse,
  deleteCourse
} from "../controllers/coursesController.js";

// admin only
router.post("/", authentication, authorize("admin"), createCourse);
router.get("/", authentication, authorize("admin"), getAllCourses);
router.put("/:id", authentication, authorize("admin"), updateCourse);
router.delete("/:id", authentication, authorize("admin"), deleteCourse);
router.post("/assign", authentication, authorize("admin"), assignCourse);
// user
router.get("/my", authentication, getMyCourses);
router.post("/progress", authentication, updateProgress);
export default router;
