import { Router } from "express";

import { authGuard, roleGuard } from "../middleware/index.js";
import { createCourseController, deleteCourseController, getAllCourseController, updateCourseController } from "../controllers/index.js";

export const courseRouter = Router();

courseRouter.post("/create", authGuard, roleGuard(["admin", "superAdmin"]), createCourseController);
courseRouter.get("/", authGuard, getAllCourseController);
courseRouter.put("/:name", authGuard, roleGuard(["admin", "superAdmin"]), updateCourseController);
courseRouter.delete("/:name", authGuard, roleGuard(["superAdmin"]), deleteCourseController);
