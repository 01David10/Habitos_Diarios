import { Router } from "express"; // Importamos el Router de express

// Importacion funciones de los controladores

// autenticacion
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";

// token
import { authRequired } from "../middlewares/validateToken.js"; // importacion de la validacion del Token (antes de acceder)

// habitos
import {
  createHabit,
  getHabits,
  getHabit,
  updateHabit,
  deleteHabit,
} from "../controllers/habit.controller.js";

const router = Router(); // Rutas del programa

// rutas 

// autenticacion
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

// habitos
router.post("/habits", authRequired, createHabit);
router.get("/habits", authRequired, getHabits);
router.get("/habits/:id", authRequired, getHabit);
router.put("/habits/:id", authRequired, updateHabit);
router.delete("/habits/:id", authRequired, deleteHabit);

export default router;
