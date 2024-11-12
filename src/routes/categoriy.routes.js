import { Router } from "express";
import { createCategoryController, deleteCategoryController, getAllCategoryController, updateCategoryaController } from "../controllers/index.js";
import { authGuard, roleGuard } from "../middleware/index.js";




export const categoriyRouter = Router();

categoriyRouter.post("/new", authGuard, roleGuard(["admin", "superAdmin"]), createCategoryController)
categoriyRouter.get("/all", authGuard, getAllCategoryController)
categoriyRouter.put("/:name", authGuard,roleGuard(["admin", "superAdmin"]),  updateCategoryaController)
categoriyRouter.delete("/:name", authGuard,roleGuard(["superAdmin"]),  deleteCategoryController)