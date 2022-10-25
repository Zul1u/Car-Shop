import * as sinon from 'sinon';
import chai from 'chai';
import Motorcycle from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/motorcycle.service';
import MotorcycleController from '../../../controllers/motorcycle.controller';
import { Request, Response } from 'express';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleUpdateMock,
  motorcycleUpdateMockWithId,
} from '../../mocks/motorcycleMocks';
const { expect } = chai;

describe('Motorcycle Controller', () => {
  const motorcycleModel = new Motorcycle();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Create motorcycle', () => {
    beforeEach(() => {
      sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId);
    });

    it('returns status 201', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;
    });

    it('returns correctly body', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

  describe('Read motorcycle', () => {
    beforeEach(() => {
      sinon.stub(motorcycleService, 'read').resolves([motorcycleMockWithId]);
    });

    it('returns status 200', async () => {
      await motorcycleController.getAll(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('returns correctly body', async () => {
      await motorcycleController.getAll(req, res);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith([motorcycleMockWithId])).to.be.true;
    });
  });

  describe('ReadOne motorcycle', () => {
    beforeEach(() => {
      sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('returns status 200', async () => {
      req.params = { id: 'valid-id' };
      await motorcycleController.getOne(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('returns correctly body', async () => {
      req.params = { id: 'valid-id' };
      await motorcycleController.getOne(req, res);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

  describe('Update motorcycle', () => {
    beforeEach(() => {
      sinon.stub(motorcycleService, 'update').resolves(motorcycleUpdateMockWithId);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('returns status 200', async () => {
      req.params = { id: 'valid-id' };
      req.body = motorcycleUpdateMock;
      await motorcycleController.update(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('returns correctly body', async () => {
      req.params = { id: 'valid-id' };
      req.body = motorcycleUpdateMock;
      await motorcycleController.update(req, res);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(motorcycleUpdateMockWithId)).to.be.true;
    });
  });

  describe('Delete motorcycle', () => {
    beforeEach(() => {
      sinon.stub(motorcycleService, 'delete').resolves(motorcycleMockWithId);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('returns status 204', async () => {
      req.params = { id: 'valid-id' };
      await motorcycleController.delete(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(204)).to.be.true;
    });

    it('returns correctly body', async () => {
      req.params = { id: 'valid-id' };
      await motorcycleController.delete(req, res);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith()).to.be.true;
    });
  });
});