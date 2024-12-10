import express from 'express'  //app para codificar el codigo de express backend
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api",authRouter);

export default app;