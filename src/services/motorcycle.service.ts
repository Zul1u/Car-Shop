import CustomError from '../errors/CustomError';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;
  private _objNotFound: string;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
    this._objNotFound = 'Object not found';
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._motorcycle.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(_id);

    if (!motorcycle) throw new CustomError(404, this._objNotFound);

    return motorcycle;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const updatedMotorcycle = await this._motorcycle.update(_id, obj);

    if (!updatedMotorcycle) throw new CustomError(404, this._objNotFound);

    return updatedMotorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const deletedMotorcycle = await this._motorcycle.delete(_id);

    if (!deletedMotorcycle) throw new CustomError(404, this._objNotFound);

    return deletedMotorcycle;
  }
}
