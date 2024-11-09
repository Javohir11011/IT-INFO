import { Router } from "express";
import {
  createArticleController,
  deleteArticleController,
  getAllArticleController,
  updateArticleController,
} from "../controllers/index.js";
import { authGuard, roleGuard } from "../middleware/index.js";

export const articleRouter = Router();

articleRouter.post("/new", authGuard, roleGuard(["admin", "superAdmin"]), createArticleController);
articleRouter.get("/all", authGuard, getAllArticleController);
articleRouter.put("/:title", authGuard, roleGuard(["admin", "superAdmin"]), updateArticleController);
articleRouter.delete("/:title", authGuard, roleGuard(["superAdmin"]), deleteArticleController);
