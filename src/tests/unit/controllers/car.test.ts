import * as sinon from 'sinon';
import chai from 'chai';
import Car from '../../../models/Car';
import CarService from '../../../services/car.service';
import CarController from '../../../controllers/car.controller';
import { Request, Response } from 'express';
import {
  carMock, carMockWithId, carUpdateMock, carUpdateMockWithId
} from '../../mocks/carMocks';
const { expect } = chai;

describe('Car Controller', () => {
  const carModel = new Car();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Create Car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'create').resolves(carMockWithId);
    });

    it('returns status 201', async () => {
      req.body = carMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;
    });

    it('returns correctly body', async () => {
      req.body = carMock;
      await carController.create(req, res);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Read car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'read').resolves([carMockWithId]);
    });

    it('returns status 200', async () => {
      await carController.getAll(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('returns correctly body', async () => {
      await carController.getAll(req, res);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith([carMockWithId])).to.be.true;
    });
  });

  describe('ReadOne car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'readOne').resolves(carMockWithId);
    });
    
    afterEach(() => {
      sinon.restore();
    })

    it('returns status 200', async () => {
      req.params = { id: 'valid-id' };
      await carController.getOne(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('returns correctly body', async () => {
      req.params = { id: 'valid-id' };
      await carController.getOne(req, res);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Update car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'update').resolves(carUpdateMockWithId);
    });
    
    afterEach(() => {
      sinon.restore();
    })

    it('returns status 200', async () => {
      req.params = { id: 'valid-id' };
      req.body = carUpdateMock;
      await carController.update(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;
    });

    it('returns correctly body', async () => {
      req.params = { id: 'valid-id' };
      req.body = carUpdateMock;
      await carController.update(req, res);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carUpdateMockWithId)).to.be.true;
    });
  });

  describe('Delete car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'delete').resolves(carMockWithId);
    });
    
    afterEach(() => {
      sinon.restore();
    })

    it('returns status 204', async () => {
      req.params = { id: 'valid-id' };
      await carController.delete(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(204)).to.be.true;
    });

    it('returns correctly body', async () => {
      req.params = { id: 'valid-id' };
      await carController.delete(req, res);

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith()).to.be.true;
    });
  });
});