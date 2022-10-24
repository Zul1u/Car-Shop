import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import CarService from '../services/car.service';

export default class CarController {
  constructor(private _service: CarService) { }

  public create = async (req: Request, res: Response<ICar>) => {
    const newCar = await this._service.create(req.body);
    return res.status(201).json(newCar);
  };

  public getAll = async (req: Request, res: Response<ICar[]>) => {
    const carsList = await this._service.read();
    res.status(200).json(carsList);
  };

  public getOne = async (req: Request, res: Response<ICar>) => {
    const car = await this._service.readOne(req.params.id);
    res.status(200).json(car);
  };

  public update = async (req: Request, res: Response<ICar>) => {
    const updatedCar = await this._service.update(req.params.id, req.body);
    res.status(200).json(updatedCar);
  };

  public delete = async (req: Request, res: Response<ICar>) => {
    await this._service.delete(req.params.id);
    res.status(204).json();
  };
}
