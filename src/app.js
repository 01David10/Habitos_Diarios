import express from 'express'  //app para codificar el codigo de express backend
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const corsOptions = {
    origin: "http://127.0.0.1:5500", // Permite solo este origen (la URL de tu frontend)
    methods: ["GET", "POST"], // Permite solo los métodos GET y POST
    allowedHeaders: ["Content-Type", "Authorization"], // Permite estos encabezados
    credentials: true, // Habilita el intercambio de cookies entre el frontend y el backend
};

// Middlewares
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// inclusion del frontend en el servidor
const frontendPath = path.join(__dirname, "../frontend");

app.use(express.static(frontendPath));

// Ruta para servir el frontend en cualquier ruta desconocida
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "/src/HTML/login.html"));
});

app.use("/api",authRouter);

export default app;