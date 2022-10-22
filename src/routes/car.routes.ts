import { Router } from 'express';
import CarController from '../controllers/car.controller';
import Car from '../models/Car';
import CarService from '../services/car.service';

const carRoute = Router();

const carModel = new Car();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRoute.post('/', carController.create);

export default carRoute;
