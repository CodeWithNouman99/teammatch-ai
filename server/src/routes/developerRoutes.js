import { Router } from "express";
import { protect, allowN8nOrUser } from "../middleware/auth.js";
import {
  getDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
} from "../controllers/developerController.js";
import { getAvailableDevelopers } from "../controllers/availabilityController.js";

const router = Router();

// "/available" must come before "/:id", otherwise Express reads "available" as an id
router.get("/available", allowN8nOrUser, getAvailableDevelopers);

router.get("/", protect, getDevelopers);
router.post("/", protect, createDeveloper);
router.get("/:id", protect, getDeveloper);
router.put("/:id", protect, updateDeveloper);

export default router;