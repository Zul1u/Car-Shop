import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error.middleware';
import carRoute from './routes/car.routes';
import motorcycleRoute from './routes/motorcycle.routes';

const app = express();

app.use(express.json());

app.use('/cars', carRoute);
app.use('/motorcycles', motorcycleRoute);

app.use(errorHandler);

export default app;
