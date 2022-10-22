import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error.middleware';
import carRoute from './routes/car.routes';

const app = express();

app.use(express.json());

app.use('/cars', carRoute);
app.use(errorHandler);

export default app;
