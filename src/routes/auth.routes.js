import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js"; // Validacion del Token antes de acceder

const router = Router(); // Rutas del programa

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

export default router;
