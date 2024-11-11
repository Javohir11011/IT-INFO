import { Router } from "express";
import {
  adminController,
  deleteAdminController,
  loginController,
  refreshTokenController,
  registerController,
  updateAdminController,
} from "../controllers/index.js";
import { authGuard, roleGuard } from "../middleware/index.js";

export const authRouter = new Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get(
  "/me",
  authGuard,
  roleGuard(["admin", "moderator"]),
  (req, res) => {
    res.send("ok");
  }
);
authRouter.post("/refresh", refreshTokenController);
authRouter.post("/admin", authGuard, roleGuard("superAdmin"), adminController);
authRouter.put(
  "/admin/update/:email",
  authGuard,
  roleGuard("superAdmin"),
  updateAdminController
);
authRouter.delete(
  "/admin/delete/:email",
  authGuard,
  roleGuard("superAdmin"),
  deleteAdminController
);
