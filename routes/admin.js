import express from "express";
const router = express.Router();

import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUsers,
} from "../controllers/adminController.js";
import authentication from "../middlewares/authentication.js";
import authorize from "../middlewares/authorize.js";

router.post("/users", authentication, authorize("admin"), createUser);
router.get("/users", authentication, authorize("admin"), getAllUsers);
router.get("/users", authentication, authorize("admin"), getUsers);
router.put("/users/:id", authentication, authorize("admin"), updateUser);
router.delete("/users/:id", authentication, authorize("admin"), deleteUser);
export default router;
