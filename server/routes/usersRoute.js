import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/user", getUser);
router.get("/users", getUsers);
router.post("/user", createUser);
router.put("/user", updateUser);
router.delete("/user", deleteUser);

export default router;
