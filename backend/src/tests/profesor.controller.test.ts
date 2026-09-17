import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';

import {
  getProfesors,
  getProfesorsByDni,
  getProfesorsById,
  createProfesor,
  updateProfesor,
  deleteProfesor,
} from '../controllers/profesor.controller.js';

import { Profesor } from '../models/index.js';

vi.mock('../models/index.js', () => ({
  Profesor: {
    findAll: vi.fn(),
    findById: vi.fn(),
    findByDNI: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('getProfesors', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería devolver todos los profesores', async () => {
    const mockData = [{ id: 1, name: 'Juan', dni: '12345678' }];
    const mockedFindAll = vi.mocked(Profesor.findAll);
    mockedFindAll.mockResolvedValue(mockData);

    const req = {} as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as unknown as NextFunction;

    await getProfesors(req, res, next);

    expect(Profesor.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería manejar error de BD', async () => {
    const mockedFindAll = vi.mocked(Profesor.findAll);
    mockedFindAll.mockRejectedValue(new Error('DB error'));

    const req = {} as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await getProfesors(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it('debería retornar array vacío', async () => {
    const mockedFindAll = vi.mocked(Profesor.findAll);
    mockedFindAll.mockResolvedValue([]);

    const req = {} as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await getProfesors(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith([]);
  });
});

describe('getProfesorsById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería retornar un profesor por ID', async () => {
    const mockData = { id: 1, name: 'Juan', dni: '12345678' };
    const mockedFindById = vi.mocked(Profesor.findById);
    mockedFindById.mockResolvedValue(mockData);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await getProfesorsById(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería retornar 400 si ID es inválido', async () => {
    const req = { params: { id: 'abc' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await getProfesorsById(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('debería retornar 404 si no existe', async () => {
    const mockedFindById = vi.mocked(Profesor.findById);
    mockedFindById.mockResolvedValue(null);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await getProfesorsById(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    const mockedFindById = vi.mocked(Profesor.findById);
    mockedFindById.mockRejectedValue(new Error('DB error'));

    const req = { params: { id: '1' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await getProfesorsById(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('getProfesorsByDni', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería retornar un profesor por DNI', async () => {
    const mockData = { id: 1, name: 'Juan', dni: '12345678' };
    const mockedFindByDNI = vi.mocked(Profesor.findByDNI);
    mockedFindByDNI.mockResolvedValue(mockData);

    const req = { params: { dni: '12345678' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await getProfesorsByDni(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería retornar 404 si no existe por DNI', async () => {
    const mockedFindByDNI = vi.mocked(Profesor.findByDNI);
    mockedFindByDNI.mockResolvedValue(null);

    const req = { params: { dni: '00000000' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await getProfesorsByDni(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    const mockedFindByDNI = vi.mocked(Profesor.findByDNI);
    mockedFindByDNI.mockRejectedValue(new Error('DB error'));

    const req = { params: { dni: '12345678' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await getProfesorsByDni(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('createProfesor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería crear un profesor correctamente', async () => {
    const mockData = { id: 1, name: 'Juan', birthdate: new Date('1990-01-01') };
    const mockedCreate = vi.mocked(Profesor.create);
    mockedCreate.mockResolvedValue(mockData);

    const req = {
      body: { name: 'Juan', birthdate: '1990-01-01' },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await createProfesor(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería manejar error de BD', async () => {
    const mockedCreate = vi.mocked(Profesor.create);
    mockedCreate.mockRejectedValue(new Error('DB error'));

    const req = {
      body: { name: 'Juan', birthdate: '1990-01-01' },
    } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await createProfesor(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('updateProfesor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería actualizar un profesor correctamente', async () => {
    const mockData = { id: 1, name: 'Juan Actualizado' };
    const mockedUpdate = vi.mocked(Profesor.update);
    mockedUpdate.mockResolvedValue(mockData);

    const req = {
      params: { id: '1' },
      body: { name: 'Juan Actualizado', birthdate: '1990-01-01' },
    } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await updateProfesor(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ updatedProfesor: mockData })
    );
  });

  it('debería retornar 400 si ID es inválido', async () => {
    const req = {
      params: { id: 'abc' },
      body: { name: 'Juan' },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await updateProfesor(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('debería retornar 404 si no existe', async () => {
    const mockedUpdate = vi.mocked(Profesor.update);
    mockedUpdate.mockResolvedValue(null);

    const req = {
      params: { id: '1' },
      body: { name: 'Juan' },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await updateProfesor(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    const mockedUpdate = vi.mocked(Profesor.update);
    mockedUpdate.mockRejectedValue(new Error('DB error'));

    const req = {
      params: { id: '1' },
      body: { name: 'Juan' },
    } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await updateProfesor(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('deleteProfesor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería eliminar un profesor correctamente', async () => {
    const mockedDelete = vi.mocked(Profesor.delete);
    mockedDelete.mockResolvedValue(true);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await deleteProfesor(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Profesor deleted successfully' })
    );
  });

  it('debería retornar 400 si ID es inválido', async () => {
    const req = { params: { id: 'abc' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await deleteProfesor(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('debería retornar 404 si no existe', async () => {
    const mockedDelete = vi.mocked(Profesor.delete);
    mockedDelete.mockResolvedValue(false);

    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await deleteProfesor(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    const mockedDelete = vi.mocked(Profesor.delete);
    mockedDelete.mockRejectedValue(new Error('DB error'));

    const req = { params: { id: '1' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await deleteProfesor(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
