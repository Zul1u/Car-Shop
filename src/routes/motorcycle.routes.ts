import { Router } from 'express';
import MotorcycleController from '../controllers/motorcycle.controller';
import Motorcycle from '../models/Motorcycle';
import MotorcycleService from '../services/motorcycle.service';

const motorcycleRoute = Router();

const motorcycleModel = new Motorcycle();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycleRoute.post('/', motorcycleController.create);
motorcycleRoute.get('/', motorcycleController.getAll);
motorcycleRoute.get('/:id', motorcycleController.getOne);
motorcycleRoute.put('/:id', motorcycleController.update);
motorcycleRoute.delete('/:id', motorcycleController.delete);

export default motorcycleRoute;
