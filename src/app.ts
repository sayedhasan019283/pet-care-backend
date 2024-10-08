/* eslint-disable no-undef */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import path from 'path';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('hello assignment 6 final for me as a MERN');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(globalErrorHandler);
app.use(notFound);

export default app;
