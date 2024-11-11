import { Router } from "express";

import { authGuard, roleGuard } from "../middleware/index.js";
import { createCommentController, deleteCommentController, getAllCommentController, updateCommentController } from "../controllers/index.js";
export const commeentRouter = Router();

commeentRouter.post("/create", authGuard, roleGuard(["admin", "superAdmin"]), createCommentController);
commeentRouter.get("/", authGuard, getAllCommentController);
commeentRouter.put("/:content", authGuard, roleGuard(["admin", "superAdmin"]), updateCommentController);
commeentRouter.delete("/:content", authGuard, roleGuard(["superAdmin"]), deleteCommentController);
