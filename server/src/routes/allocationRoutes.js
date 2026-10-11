import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getAllocations, createAllocation } from "../controllers/allocationController.js";

const router = Router();

router.get("/", protect, getAllocations);
router.post("/", protect, createAllocation);

export default router;