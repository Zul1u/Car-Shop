import { IMotorcycle } from "../../interfaces/IMotorcycle";

export const motorcycleMock: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const motorcycleUpdateMock: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const motorcycleUpdateMockWithId: IMotorcycle & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const invalidMongId: string = 'Id must have 24 hexadecimal characters';
export const objNotFound: string = 'Object not found';