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
} from "../controllers/habit.js";

const router = Router(); // Rutas del programa

// rutas 

// autenticacion
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authRequired, logout);
router.get("/profile", authRequired, profile);

// verificar si ya inicio sesion
router.get("/check-session", (req, res) => {
  if (req.cookies.token) {
      return res.json({ authenticated: true });
  }
  res.json({ authenticated: false });
});

// habitos
router.post("/createHabit", authRequired, createHabit);
router.get("/habits", authRequired, getHabits);
router.get("/habits/:category", authRequired, getHabitByCategory); 

export default router;
