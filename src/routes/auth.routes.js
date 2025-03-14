import { Router } from "express"; // Importamos el Router de express

// Importacion funciones de los controladores

// autenticacion
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";

// requerir token
import { authRequired } from "../middlewares/validateToken.js"; // importacion de la validacion del Token (antes de acceder)

// habitos
import {
  createHabit,
  getHabits,
  getHabitByCategory,
  updateHabit,
  deleteHabit,
} from "../controllers/habit.js";

const router = Router(); // Rutas del programa

// rutas 

// autenticacion
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authRequired, logout);
router.get("/profile", profile);

// habitos
router.post("/createHabit", authRequired, createHabit);
router.get("/habits", authRequired, getHabits);
router.get("/habits/:category", authRequired, getHabitByCategory); 
router.put("/habits/:id", updateHabit);     
router.delete("/habits/:id", deleteHabit);

export default router;
