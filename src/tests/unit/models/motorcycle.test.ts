import * as sinon from 'sinon';
import chai from 'chai';
import Motorcycle from '../../../models/Motorcycle';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleUpdateMock,
  motorcycleUpdateMockWithId,
  invalidMongId
} from '../../mocks/motorcycleMocks';
const { expect } = chai;

describe('Motorcycle Model', () => {
  const motorcycleModel = new Motorcycle();

  before(async () => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
    sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleUpdateMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
  });

  after(() => {
    sinon.restore();
  })

  describe('creating a motorcycle', () => {
    it('successfully created', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('searching all motorcycles list', () => {
    it('successfully found', async () => {
      const motorcycleList = await motorcycleModel.read();
      expect(motorcycleList).to.be.deep.equal([motorcycleMockWithId]);
    });
  });

  describe('searching a one specify motorcycle', () => {
    it('successfully found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const motorcycle = await motorcycleModel.readOne('valid-id');
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
      stub.restore();
    });

    it('invalid _id', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let error;

      try {
        await motorcycleModel.readOne('invalid-id');
      } catch (err) {
        error = err
      }

      expect(error).not.to.be.undefined;
      expect((error as Error).message).to.be.equal(invalidMongId);
      stub.restore();
    });
  });

  describe('updating a motorcycle', () => {
    it('successfully updates', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);

      const updatedMotorcycle = await motorcycleModel.update('valid-id', motorcycleUpdateMock);
      expect(updatedMotorcycle).to.be.deep.equal(motorcycleUpdateMockWithId);

      stub.restore();
    });

    it('invalid _id', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let error;

      try {
        await motorcycleModel.update('invalid-id', motorcycleUpdateMock);
      } catch (err) {
        error = err
      }

      expect(error).not.to.be.undefined;
      expect((error as Error).message).to.be.equal(invalidMongId);
      stub.restore();
    });
  });

  describe('deleting a motorcycle', () => {
    it('successfully deleting', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);

      const deletedMotorcycle = await motorcycleModel.delete('valid-id');
      expect(deletedMotorcycle).to.be.deep.equal(motorcycleMockWithId);

      stub.restore();
    });

    it('invalid _id', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let error;

      try {
        await motorcycleModel.delete('invalid-id');
      } catch (err) {
        error = err
      }

      expect(error).not.to.be.undefined;
      expect((error as Error).message).to.be.equal(invalidMongId);
      stub.restore();
    });
  });
});