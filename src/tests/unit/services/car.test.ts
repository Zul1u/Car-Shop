import * as sinon from 'sinon';
import chai from 'chai';
import Car from '../../../models/Car';
import CarService from '../../../services/car.service';
import {
  carMock,
  carMockWithId,
  carUpdateMock,
  carUpdateMockWithId,
  objNotFound
} from '../../mocks/carMocks';
import { ZodError } from 'zod';
import { ICar } from '../../../interfaces/ICar';
import CustomError from '../../../errors/CustomError';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new Car;
  const carService = new CarService(carModel);

  describe('Success Cases', () => {
    before(async () => {
      sinon.stub(carModel, 'create').resolves(carMockWithId);
      sinon.stub(carModel, 'read').resolves([carMockWithId]);
      sinon.stub(carModel, 'readOne').resolves(carMockWithId);
      sinon.stub(carModel, 'update').resolves(carUpdateMockWithId);
      sinon.stub(carModel, 'delete').resolves(carMockWithId);
    });

    after(() => {
      sinon.restore();
    })

    describe('Create car', () => {
      it('Successfully created car', async () => {
        const carCreated = await carService.create(carMock);

        expect(carCreated).to.be.deep.equal(carMockWithId);
      });
    });

    describe('Read car', () => {
      it('Successfully found cars', async () => {
        const carsList = await carService.read();

        expect(carsList).to.be.deep.equal([carMockWithId]);
      });
    });

    describe('ReadOne car', () => {
      it('Successfully found car', async () => {
        const cars = await carService.readOne('valid-id');

        expect(cars).to.be.deep.equal(carMockWithId);
      });
    });

    describe('Update car', () => {
      it('Successfully updated car', async () => {
        const cars = await carService.update('valid-id', carUpdateMock);
        expect(cars).to.be.deep.equal(carUpdateMockWithId);
      });
    });

    describe('Delete car', () => {
      it('Successfully deleted car', async () => {
        const cars = await carService.delete('valid-id');
        expect(cars).to.be.deep.equal(carMockWithId);
      });
    });
  });

  describe('Failure Cases', () => {
    before(async () => {
      sinon.stub(carModel, 'create').resolves(null as any);
      sinon.stub(carModel, 'readOne').resolves(null as any);
      sinon.stub(carModel, 'update').resolves(null as any);
      sinon.stub(carModel, 'delete').resolves(null as any);
    });

    after(() => {
      sinon.restore();
    })

    describe('Create car', () => {
      it('Failure create car', async () => {
        let error;

        try {
          await carService.create({} as ICar);
        } catch (err) {
          error = err;
        }

        expect(error).not.to.be.undefined;
        expect(error).to.be.instanceOf(ZodError);
      });
    });

    describe('ReadOne car', () => {
      it('_id not found', async () => {
        let error;

        try {
          await carService.readOne('invalid-id');
        } catch (err) {
          error = err;
        }

        expect(error).not.to.be.undefined;
        expect((error as CustomError).message).to.be.equal(objNotFound);
        expect((error as CustomError).status).to.be.equal(404);
      });
    });

    describe('Update car', () => {
      it('Failure update car', async () => {
        let error;

        try {
          await carService.update('invalid-id', {} as ICar);
        } catch (err) {
          error = err;
        }

        expect(error).not.to.be.undefined;
        expect(error).to.be.instanceOf(ZodError);
      });
    });

    it('_id not found', async () => {
      let error;

      try {
        await carService.update('invalid-id', carUpdateMock);
      } catch (err) {
        error = err;
      }

      expect(error).not.to.be.undefined;
      expect((error as CustomError).message).to.be.equal(objNotFound);
      expect((error as CustomError).status).to.be.equal(404);
    });

    describe('Delete car', () => {
      it('_id not found', async () => {
        let error;
  
        try {
          await carService.delete('invalid-id');
        } catch (err) {
          error = err;
        }
  
        expect(error).not.to.be.undefined;
        expect((error as CustomError).message).to.be.equal(objNotFound);
        expect((error as CustomError).status).to.be.equal(404);
      });
    });
  });
});