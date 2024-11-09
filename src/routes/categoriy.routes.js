import { Router } from "express";
import { createCategoriyController, deleteCategoryController, getAllCategoryController, updateCategoryaController } from "../controllers/index.js";
import { authGuard, roleGuard } from "../middleware/index.js";




export const categoriyRouter = Router();

categoriyRouter.post("/new", authGuard, roleGuard(["admin", "superAdmin"]), createCategoriyController)
categoriyRouter.get("/all", authGuard, getAllCategoryController)
categoriyRouter.put("/:name", authGuard,roleGuard(["admin", "superAdmin"]),  updateCategoryaController)
categoriyRouter.delete("/:name", authGuard,roleGuard(["superAdmin"]),  deleteCategoryController)