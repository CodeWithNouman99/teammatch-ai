import { Router } from "express";
import { protect } from "../middleware/auth.js";
import {
  getDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
} from "../controllers/developerController.js";

const router = Router();

router.get("/", protect, getDevelopers);
router.post("/", protect, createDeveloper);
router.get("/:id", protect, getDeveloper);
router.put("/:id", protect, updateDeveloper);

export default router;