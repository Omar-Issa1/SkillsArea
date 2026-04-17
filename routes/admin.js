import express from "express";
const router = express.Router();

import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser } from "../controllers/adminController.js";
import authentication from "../middlewares/authentication.js";
import authorize from "../middlewares/authorize.js";

router.post("/users", authentication, authorize("admin"), createUser);
router.get("/users", authentication, authorize("admin"), getAllUsers);
router.put("/users/:id", authentication, authorize("admin"), updateUser);
router.delete("/users/:id", authentication, authorize("admin"), deleteUser);
export default router;
