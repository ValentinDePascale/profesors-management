import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import {
  getAllLicenseTypes,
  getLicenseTypesByArticle,
  createLicenseType,
  updateLicenseType,
  deleteLicenseType,
} from '../controllers/licensetype.controller.js';

import { LicenseType } from '../models/index.js';

vi.mock('../models/index.js', () => ({
  LicenseType: {
    findAll: vi.fn(),
    findByArticle: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('getAllLicenseTypes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debria devolver todos los tipos licencias', async () => {
    const mockData = [{ article: 'A1', description: 'Test' }];
    const mockedFindAll = vi.mocked(LicenseType.findAll);
    mockedFindAll.mockResolvedValue(mockData);

    const req = {} as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as unknown as NextFunction;

    await getAllLicenseTypes(req, res, next);

    expect(LicenseType.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });
});

describe('getLicenseTypesByArticle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería retornar el license type por article', async () => {
    const mockData = { article: 'A1', description: 'Test' };
    vi.mocked(LicenseType.findByArticle).mockResolvedValue(mockData);

    const req = { params: { article: 'A1' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await getLicenseTypesByArticle(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería retornar 400 si article es vacío', async () => {
    const req = { params: { article: '' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await getLicenseTypesByArticle(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('debería retornar 404 si no existe', async () => {
    vi.mocked(LicenseType.findByArticle).mockResolvedValue(null);

    const req = { params: { article: 'A1' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await getLicenseTypesByArticle(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    vi.mocked(LicenseType.findByArticle).mockRejectedValue(
      new Error('DB error')
    );

    const req = { params: { article: 'A1' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await getLicenseTypesByArticle(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('createLicenseType', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería crear un license type correctamente', async () => {
    const mockData = { article: 'A1', description: 'Test' };
    vi.mocked(LicenseType.create).mockResolvedValue(mockData);

    const req = { body: { article: 'A1', description: 'Test' } } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await createLicenseType(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('debería manejar error de BD', async () => {
    vi.mocked(LicenseType.create).mockRejectedValue(new Error('DB error'));

    const req = { body: { article: 'A1', description: 'Test' } } as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await createLicenseType(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('updateLicenseType', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería actualizar un license type correctamente', async () => {
    const mockData = { article: 'A1', description: 'Updated' };
    vi.mocked(LicenseType.update).mockResolvedValue(mockData);

    const req = {
      params: { article: 'A1' },
      body: { description: 'Updated' },
    } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;

    await updateLicenseType(req, res, vi.fn());

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ updatedlicensetype: mockData })
    );
  });

  it('debería retornar 404 si no existe', async () => {
    vi.mocked(LicenseType.update).mockResolvedValue(null);

    const req = {
      params: { article: 'A1' },
      body: { description: 'Updated' },
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await updateLicenseType(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    vi.mocked(LicenseType.update).mockRejectedValue(new Error('DB error'));

    const req = {
      params: { article: 'A1' },
      body: { description: 'Updated' },
    } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await updateLicenseType(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('deleteLicenseType', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería eliminar un license type correctamente', async () => {
    vi.mocked(LicenseType.delete).mockResolvedValue(true);

    const req = { params: { article: 'A1' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await deleteLicenseType(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('debería retornar 404 si no existe', async () => {
    vi.mocked(LicenseType.delete).mockResolvedValue(false);

    const req = { params: { article: 'A1' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await deleteLicenseType(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('debería manejar error de BD', async () => {
    vi.mocked(LicenseType.delete).mockRejectedValue(new Error('DB error'));

    const req = { params: { article: 'A1' } } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn();

    await deleteLicenseType(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
