import * as sinon from 'sinon';
import chai from 'chai';
import Motorcycle from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/motorcycle.service';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleUpdateMock,
  motorcycleUpdateMockWithId,
  objNotFound
} from '../../mocks/motorcycleMocks';
import { ZodError } from 'zod';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
import CustomError from '../../../errors/CustomError';
const { expect } = chai;

describe('Motorcycle Service', () => {
  const motorcycleModel = new Motorcycle;
  const motorcycleService = new MotorcycleService(motorcycleModel);

  describe('Success Cases', () => {
    before(async () => {
      sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
      sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
      sinon.stub(motorcycleModel, 'readOne').resolves(motorcycleMockWithId);
      sinon.stub(motorcycleModel, 'update').resolves(motorcycleUpdateMockWithId);
      sinon.stub(motorcycleModel, 'delete').resolves(motorcycleMockWithId);
    });

    after(() => {
      sinon.restore();
    })

    describe('Create motorcycle', () => {
      it('Successfully created motorcycle', async () => {
        const motorcycleCreated = await motorcycleService.create(motorcycleMock);

        expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
      });
    });

    describe('Read motorcycle', () => {
      it('Successfully found motorcycle', async () => {
        const motorcycleList = await motorcycleService.read();

        expect(motorcycleList).to.be.deep.equal([motorcycleMockWithId]);
      });
    });

    describe('ReadOne motorcycle', () => {
      it('Successfully found motorcycle', async () => {
        const motorcycle = await motorcycleService.readOne('valid-id');

        expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
      });
    });

    describe('Update motorcycle', () => {
      it('Successfully updated motorcycle', async () => {
        const motorcycles = await motorcycleService.update('valid-id', motorcycleUpdateMock);
        expect(motorcycles).to.be.deep.equal(motorcycleUpdateMockWithId);
      });
    });

    describe('Delete motorcycle', () => {
      it('Successfully deleted motorcycle', async () => {
        const motorcycle = await motorcycleService.delete('valid-id');
        expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
      });
    });
  });

  describe('Failure Cases', () => {
    before(async () => {
      sinon.stub(motorcycleModel, 'create').resolves(null as any);
      sinon.stub(motorcycleModel, 'readOne').resolves(null as any);
      sinon.stub(motorcycleModel, 'update').resolves(null as any);
      sinon.stub(motorcycleModel, 'delete').resolves(null as any);
    });

    after(() => {
      sinon.restore();
    })

    describe('Create motorcycle', () => {
      it('Failure create motorcycle', async () => {
        let error;

        try {
          await motorcycleService.create({} as IMotorcycle);
        } catch (err) {
          error = err;
        }

        expect(error).not.to.be.undefined;
        expect(error).to.be.instanceOf(ZodError);
      });
    });

    describe('ReadOne motorcycle', () => {
      it('_id not found', async () => {
        let error;

        try {
          await motorcycleService.readOne('invalid-id');
        } catch (err) {
          error = err;
        }

        expect(error).not.to.be.undefined;
        expect((error as CustomError).message).to.be.equal(objNotFound);
        expect((error as CustomError).status).to.be.equal(404);
      });
    });

    describe('Update motorcycle', () => {
      it('Failure update motorcycle', async () => {
        let error;

        try {
          await motorcycleService.update('invalid-id', {} as IMotorcycle);
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
        await motorcycleService.update('invalid-id', motorcycleUpdateMock);
      } catch (err) {
        error = err;
      }

      expect(error).not.to.be.undefined;
      expect((error as CustomError).message).to.be.equal(objNotFound);
      expect((error as CustomError).status).to.be.equal(404);
    });

    describe('Delete motorcycle', () => {
      it('_id not found', async () => {
        let error;
  
        try {
          await motorcycleService.delete('invalid-id');
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