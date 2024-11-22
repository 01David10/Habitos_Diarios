import jwt from 'jsonwebtoken'; //Dependencia del jsonwebtoken del npm
import { TOKEN_SECRET } from "../config.js"; //importar parametro del token


export function createAccessToken(payload) {   //Funcion para crear el token con jsonwebtoken
  return new Promise((resolve, reject) => {  //funcion de new promise para manejar el error si lo hay o devuelva si esta bien
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
