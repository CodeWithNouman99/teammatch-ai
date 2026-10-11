import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { createRequest, getRequests, getRequest } from "../controllers/requestController.js";

const router = Router();

router.get("/", protect, getRequests);
router.post("/", protect, createRequest);
router.get("/:id", protect, getRequest);

export default router;