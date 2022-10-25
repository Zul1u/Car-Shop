import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public create = async (req: Request, res: Response<IMotorcycle>) => {
    const newMotorcycle = await this._service.create(req.body);
    return res.status(201).json(newMotorcycle);
  };

  public getAll = async (_req: Request, res: Response<IMotorcycle[]>) => {
    const motorcyclesList = await this._service.read();
    res.status(200).json(motorcyclesList);
  };

  public getOne = async (req: Request, res: Response<IMotorcycle>) => {
    const motorcycle = await this._service.readOne(req.params.id);
    res.status(200).json(motorcycle);
  };

  public update = async (req: Request, res: Response<IMotorcycle>) => {
    const updatedMotorcycle = await this._service.update(req.params.id, req.body);
    res.status(200).json(updatedMotorcycle);
  };

  public delete = async (req: Request, res: Response<IMotorcycle>) => {
    await this._service.delete(req.params.id);
    res.status(204).json();
  };
}
