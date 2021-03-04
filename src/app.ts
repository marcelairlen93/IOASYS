import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// ================ THIRD PARTY MIDDLEWARES ================ //
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '25mb' }));

app.get('/', (request: Request, response: Response): Response => response.json({
  message: 'API Working',
}));

export default app;
