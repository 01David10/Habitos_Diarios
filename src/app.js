import express from 'express'  //app para codificar el codigo de express backend
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: "http://127.0.0.1:5500", // Permite solo este origen (la URL de tu frontend)
    methods: ["GET", "POST"], // Permite solo los métodos GET y POST
    allowedHeaders: ["Content-Type", "Authorization"], // Permite estos encabezados
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api",authRouter);

export default app;