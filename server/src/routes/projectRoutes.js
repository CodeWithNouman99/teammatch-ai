import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getProjects, createProject } from "../controllers/projectController.js";

const router = Router();

router.get("/", protect, getProjects);
router.post("/", protect, createProject);

export default router;