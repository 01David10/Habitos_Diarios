import express from 'express'  //app para codificar el codigo de express backend
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url); // obtiene la ruta del archivo actual (ya que no se puede usar __dirname por estar en módulos ES)
const __dirname = path.dirname(__filename); // obtiene la ruta del directorio actual

const frontendPath = path.join(__dirname, "../frontend");

// inclusion del frontend en el servidor
app.use(express.static(frontendPath));

// endpoint para la página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "/src/HTML/login.html"));
});

app.use("/api",authRouter);

export default app;