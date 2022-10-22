import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import CarService from '../services/car.service';

export default class CarController {
  constructor(private _service: CarService) { }

  public create = async (req: Request, res: Response<ICar>) => {
    const newCar = await this._service.create(req.body);
    return res.status(201).json(newCar);
  };
}
