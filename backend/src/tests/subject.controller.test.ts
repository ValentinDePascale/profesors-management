import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';

import {
  getAllSubjects,
  getByCUPOF,
  createSubject,
  updateSubject,
  deleteSubject,
} from '../controllers/subject.controller.js';

import { Subject } from '../models/index.js';

vi.mock('../models/index.js', () => ({
  Subject: {
    findAll: vi.fn(),
    findByCUPOF: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('getAllSubjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería devolver todas las asignaturas', async () => {
    const mockData = [{ cupof: 123, name: 'Matemáticas' }] as any;
    const mockedFindAll = vi.mocked(Subject.findAll);
    mockedFindAll.mockResolvedValue(mockData);

    const req = {} as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as unknown as NextFunction;

    await getAllSubjects(req, res, next);

    expect(Subject.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería manejar error de BD', async () => {
    const mockedFindAll = vi.mocked(Subject.findAll);
    mockedFindAll.mockRejectedValue(new Error('DB error'));

    const req = {} as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await getAllSubjects(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it('debería retornar array vacío', async () => {
    const mockedFindAll = vi.mocked(Subject.findAll);
    mockedFindAll.mockResolvedValue([]);

    const req = {} as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await getAllSubjects(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith([]);
  });
});

describe('getByCUPOF', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería retornar una asignatura por CUPOF', async () => {
    const mockData = { cupof: 123, name: 'Matemáticas' } as any;
    const mockedFindByCUPOF = vi.mocked(Subject.findByCUPOF);
    mockedFindByCUPOF.mockResolvedValue(mockData);

    const req = { params: { cupof: '123' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await getByCUPOF(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería retornar 400 si CUPOF es inválido', async () => {
    const req = { params: { cupof: 'abc' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await getByCUPOF(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('debería retornar 404 si no existe', async () => {
    const mockedFindByCUPOF = vi.mocked(Subject.findByCUPOF);
    mockedFindByCUPOF.mockResolvedValue(null);

    const req = { params: { cupof: '123' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await getByCUPOF(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    const mockedFindByCUPOF = vi.mocked(Subject.findByCUPOF);
    mockedFindByCUPOF.mockRejectedValue(new Error('DB error'));

    const req = { params: { cupof: '123' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await getByCUPOF(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('createSubject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería crear una asignatura correctamente', async () => {
    const mockData = { cupof: 123, name: 'Matemáticas' } as any;
    const mockedCreate = vi.mocked(Subject.create);
    mockedCreate.mockResolvedValue(mockData);

    const req = {
      body: { cupof: 123, name: 'Matemáticas' },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await createSubject(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería manejar error de BD', async () => {
    const mockedCreate = vi.mocked(Subject.create);
    mockedCreate.mockRejectedValue(new Error('DB error'));

    const req = {
      body: { cupof: 123, name: 'Matemáticas' },
    } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await createSubject(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('updateSubject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería actualizar una asignatura correctamente', async () => {
    const mockData = { cupof: 123, name: 'Matemáticas Avanzadas' } as any;
    const mockedUpdate = vi.mocked(Subject.update);
    mockedUpdate.mockResolvedValue(mockData);

    const req = {
      params: { cupof: '123' },
      body: { name: 'Matemáticas Avanzadas' },
    } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await updateSubject(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ updatedSubject: mockData })
    );
  });

  it('debería retornar 400 si CUPOF es inválido', async () => {
    const req = {
      params: { cupof: 'abc' },
      body: { name: 'Matemáticas' },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await updateSubject(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('debería retornar 404 si no existe', async () => {
    const mockedUpdate = vi.mocked(Subject.update);
    mockedUpdate.mockResolvedValue(null);

    const req = {
      params: { cupof: '123' },
      body: { name: 'Matemáticas' },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await updateSubject(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    const mockedUpdate = vi.mocked(Subject.update);
    mockedUpdate.mockRejectedValue(new Error('DB error'));

    const req = {
      params: { cupof: '123' },
      body: { name: 'Matemáticas' },
    } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await updateSubject(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('deleteSubject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería eliminar una asignatura correctamente', async () => {
    const mockData = { cupof: 123, name: 'Matemáticas' } as any;
    const mockedDelete = vi.mocked(Subject.delete);
    mockedDelete.mockResolvedValue(mockData);

    const req = { params: { cupof: '123' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await deleteSubject(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Subject deleted successfully' })
    );
  });

  it('debería retornar 400 si CUPOF es inválido', async () => {
    const req = { params: { cupof: 'abc' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await deleteSubject(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('debería retornar 404 si no existe', async () => {
    const mockedDelete = vi.mocked(Subject.delete);
    mockedDelete.mockResolvedValue(null);

    const req = { params: { cupof: '123' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await deleteSubject(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    const mockedDelete = vi.mocked(Subject.delete);
    mockedDelete.mockRejectedValue(new Error('DB error'));

    const req = { params: { cupof: '123' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await deleteSubject(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
