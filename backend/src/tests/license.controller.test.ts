import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import {
  getAllLicense,
  getById,
  createLicense,
  updateLicense,
  deleteLicense,
} from '../controllers/license.controller.js';

import { License } from '../models/index.js';

vi.mock('../models/index.js', () => ({
  License: {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('getAllLicense', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería devolver todas las licencias', async () => {
    const mockData = [
      { id: 1, profesorId: 1, subjectId: 1, articleCode: 'A1' },
    ];
    const mockedFindAll = vi.mocked(License.findAll);
    mockedFindAll.mockResolvedValue(mockData);

    const req = {} as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as unknown as NextFunction;

    await getAllLicense(req, res, next);

    expect(License.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería manejar error de BD', async () => {
    const mockedFindAll = vi.mocked(License.findAll);
    mockedFindAll.mockRejectedValue(new Error('DB error'));

    const req = {} as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await getAllLicense(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it('debería retornar array vacío', async () => {
    const mockedFindAll = vi.mocked(License.findAll);
    mockedFindAll.mockResolvedValue([]);

    const req = {} as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await getAllLicense(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith([]);
  });
});

describe('getById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería retornar una licencia por ID', async () => {
    const mockData = { id: 1, profesorId: 1, subjectId: 1, articleCode: 'A1' };
    const mockedFindById = vi.mocked(License.findById);
    mockedFindById.mockResolvedValue(mockData);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await getById(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería retornar 400 si ID es inválido', async () => {
    const req = { params: { id: 'abc' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await getById(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('debería retornar 404 si no existe', async () => {
    const mockedFindById = vi.mocked(License.findById);
    mockedFindById.mockResolvedValue(null);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await getById(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    const mockedFindById = vi.mocked(License.findById);
    mockedFindById.mockRejectedValue(new Error('DB error'));

    const req = { params: { id: '1' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await getById(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('createLicense', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería crear una licencia correctamente', async () => {
    const mockData = { id: 1, profesorId: 1, subjectId: 1, articleCode: 'A1' };
    const mockedCreate = vi.mocked(License.create);
    mockedCreate.mockResolvedValue(mockData);

    const req = {
      body: { profesorId: 1, subjectId: 1, articleCode: 'A1' },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await createLicense(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería manejar error de BD', async () => {
    const mockedCreate = vi.mocked(License.create);
    mockedCreate.mockRejectedValue(new Error('DB error'));

    const req = {
      body: { profesorId: 1, subjectId: 1, articleCode: 'A1' },
    } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await createLicense(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('updateLicense', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería actualizar una licencia correctamente', async () => {
    const mockData = { id: 1, profesorId: 2, subjectId: 1, articleCode: 'A1' };
    const mockedUpdate = vi.mocked(License.update);
    mockedUpdate.mockResolvedValue(mockData);

    const req = {
      params: { id: '1' },
      body: { profesorId: 2 },
    } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await updateLicense(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ updatedLicense: mockData })
    );
  });

  it('debería retornar 400 si ID es inválido', async () => {
    const req = {
      params: { id: 'abc' },
      body: { profesorId: 2 },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await updateLicense(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('debería retornar 404 si no existe', async () => {
    const mockedUpdate = vi.mocked(License.update);
    mockedUpdate.mockResolvedValue(null);

    const req = {
      params: { id: '1' },
      body: { profesorId: 2 },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await updateLicense(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    const mockedUpdate = vi.mocked(License.update);
    mockedUpdate.mockRejectedValue(new Error('DB error'));

    const req = {
      params: { id: '1' },
      body: { profesorId: 2 },
    } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await updateLicense(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('deleteLicense', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería eliminar una licencia correctamente', async () => {
    const mockedDelete = vi.mocked(License.delete);
    mockedDelete.mockResolvedValue(true);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await deleteLicense(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'License deleted successfully' })
    );
  });

  it('debería retornar 400 si ID es inválido', async () => {
    const req = { params: { id: 'abc' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await deleteLicense(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('debería retornar 404 si no existe', async () => {
    const mockedDelete = vi.mocked(License.delete);
    mockedDelete.mockResolvedValue(false);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await deleteLicense(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    const mockedDelete = vi.mocked(License.delete);
    mockedDelete.mockRejectedValue(new Error('DB error'));

    const req = { params: { id: '1' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await deleteLicense(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
