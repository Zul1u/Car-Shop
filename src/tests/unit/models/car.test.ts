import * as sinon from 'sinon';
import chai from 'chai';
import Car from '../../../models/Car';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import {
  carMock,
  carMockWithId,
  carUpdateMock,
  carUpdateMockWithId,
  invalidMongId
} from '../../mocks/carMocks';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new Car();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carUpdateMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching all cars list', () => {
    it('successfully found', async () => {
      const carList = await carModel.read();
      expect(carList).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('searching a one specify car', () => {
    it('successfully found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const car = await carModel.readOne('valid-id');
      expect(car).to.be.deep.equal(carMockWithId);
      stub.restore();
    });

    it('_id not found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let error;

      try {
        await carModel.readOne('invalid-id');
      } catch (err) {
        error = err
      }

      expect(error).not.to.be.undefined;
      expect((error as Error).message).to.be.equal(invalidMongId);
      stub.restore();
    });
  });

  describe('updating a car', () => {
    it('successfully updates', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);

      const updatedCar = await carModel.update('valid-id', carUpdateMock);
      expect(updatedCar).to.be.deep.equal(carUpdateMockWithId);

      stub.restore();
    });

    it('_id not found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let error;

      try {
        await carModel.update('invalid-id', carUpdateMock);
      } catch (err) {
        error = err
      }

      expect(error).not.to.be.undefined;
      expect((error as Error).message).to.be.equal(invalidMongId);
      stub.restore();
    });
  });

  describe('deleting a car', () => {
    it('successfully deleting', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);

      const deletedCar = await carModel.delete('valid-id');
      expect(deletedCar).to.be.deep.equal(carMockWithId);

      stub.restore();
    });

    it('_id not found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let error;

      try {
        await carModel.delete('invalid-id');
      } catch (err) {
        error = err
      }

      expect(error).not.to.be.undefined;
      expect((error as Error).message).to.be.equal(invalidMongId);
      stub.restore();
    });
  });  
});