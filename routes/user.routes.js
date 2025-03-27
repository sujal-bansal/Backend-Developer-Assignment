import express from "express";
import { getMe, updateUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/profile", protectRoute, getMe);
router.post("/update", protectRoute, updateUser);

export default router;
