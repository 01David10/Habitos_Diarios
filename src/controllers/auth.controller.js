import User from "../models/user.model.js"; //import del objecto user
import bcrypt from "bcryptjs"; // Dependencia de npm para encriptar constraseñas 
import { createAccessToken } from "../libs/jwt.js"; // import del token

export const register = async (req, res) => {      //Funcion para Crear,Guardar  el usuario
  const { email, password, username } = req.body; //requerimientos 

  try {
    const passwordHash = await bcrypt.hash(password, 10); //Emcriptar contraseña

    const newUser = new User({ //Crear Usuario
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save(); //Guardar usuario
    const token = await createAccessToken({ id: userSaved.id }); //Creacion del Token
    res.cookie("token", token); // Guardar token en Cookie

    res.json({    // Respuesta del servidor de los parametros del usuario 
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
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no Encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

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
