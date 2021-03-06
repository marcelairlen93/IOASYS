import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import AuthRoutes from '@routes/AuthRoutes';
import FilmRoutes from '@routes/FilmRoutes';
import RatingRoutes from '@routes/RatingRoutes';
import UserRoutes from '@routes/UserRoutes';

const app = express();

// ================ THIRD PARTY MIDDLEWARES ================ //
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '25mb' }));

app.use('/auth', AuthRoutes);
app.use('/user', UserRoutes);
app.use('/film', FilmRoutes);
app.use('/rating', RatingRoutes);

export default app;
