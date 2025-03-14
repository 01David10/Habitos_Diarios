import User from "../models/user.model.js"; //import del objecto user
import bcrypt from "bcryptjs"; // Dependencia de npm para encriptar constraseñas
import { createAccessToken } from "../libs/jwt.js"; // import del token

export const register = async (req, res) => {
  //Funcion para Crear,Guardar  el usuario
  const { email, password, username } = req.body; //requerimientos

  try {
    const passwordHash = await bcrypt.hash(password, 10); //Encriptar contraseña

    const newUser = new User({
      //Crear Usuario
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save(); //Guardar usuario
    const token = await createAccessToken({ id: userSaved.id }); //Creacion del Token
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({
      // Respuesta del servidor de los parametros del usuario
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  //Funcion para Verificar el login,contraseña del usuario
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email }); // Encontrar Usuario Registrado
    if (!userFound)
      return res.status(400).json({ message: "Usuario no Encontrado" }); // Si no lo encontro muestra mensaje

    const isMatch = await bcrypt.compare(password, userFound.password); //Metodo que se utiliza para validar una cadena de texto que cumpla con el patron
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" }); // Mensaje de contraseña incorrecta

    const token = await createAccessToken({ id: userFound.id }); //Creacion del Token con ese ID
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Funcion para salir del programa
export const logout = (req, res) => {
  // eliminar cookie
  res.clearCookie("token")

  // Redirigir al usuario a la página de login después de hacer logout
  return res.redirect("/src/HTML/login.html");
};

export const profile = async (req, res) => {
  //Acceder a Datos del Usuario
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
  res.send("profile");
};
