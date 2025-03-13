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
  getHabitByCategory,
  updateHabit,
  deleteHabit,
} from "../controllers/habit.js";

const router = Router(); // Rutas del programa

// rutas 

// autenticacion
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", profile);

// habitos
router.post("/createHabit", createHabit);
router.get("/habits", getHabits);
router.get("/habits/:category", getHabitByCategory); 
router.put("/habits/:id", updateHabit);     
router.delete("/habits/:id", deleteHabit);

export default router;
