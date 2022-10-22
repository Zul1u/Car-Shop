import CustomError from '../errors/CustomError';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  private _car: IModel<ICar>;
  private _objNotFound: string;

  constructor(model: IModel<ICar>) {
    this._car = model;
    this._objNotFound = 'Object not found';
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);

    if (!car) throw new CustomError(404, this._objNotFound);

    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar> {
    const updatedCar = await this._car.update(_id, obj);

    if (!updatedCar) throw new CustomError(404, this._objNotFound);

    return updatedCar;
  }

  public async delete(_id: string): Promise<ICar> {
    const deletedCar = await this._car.delete(_id);

    if (!deletedCar) throw new CustomError(404, this._objNotFound);

    return deletedCar;
  }
}
