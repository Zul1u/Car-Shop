import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import CustomError from '../errors/CustomError';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;
  private _invalidMongId: string;

  constructor(model: Model<T>) {
    this._model = model;
    this._invalidMongId = 'Id must have 24 hexadecimal characters';
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new CustomError(400, this._invalidMongId);

    return this._model.findOne({ _id });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new CustomError(400, this._invalidMongId);

    return this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new CustomError(400, this._invalidMongId);
    return this._model.findByIdAndDelete({ _id });
  }
}

export default MongoModel;