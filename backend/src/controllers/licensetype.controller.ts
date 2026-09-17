import { Request, Response, NextFunction } from 'express';
import { LicenseType } from '../models/index.js';

export async function getAllLicenseTypes(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const licensetypes = await LicenseType.findAll();

    res.json(licensetypes);
  } catch (error) {
    next(error);
  }
}

export async function getLicenseTypesByArticle(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const article = String(req.params.article);

    if (!article) {
      res.status(400).json({ error: 'Invalid Article format' });
      return;
    }
    const licensetype = await LicenseType.findByArticle(article);

    if (!licensetype) {
      res.status(404).json({ error: 'LicenseType not found' });
      return;
    }

    res.json(licensetype);
  } catch (error) {
    next(error);
  }
}

export async function createLicenseType(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = req.body;
    const newLicenseType = await LicenseType.create(data);
    res.status(201).json(newLicenseType);
  } catch (error) {
    next(error);
  }
}

export async function updateLicenseType(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const article = String(req.params.article);

    if (!article) {
      res.status(400).json({ error: 'Invalid Article format' });
      return;
    }
    const data = req.body;

    const updatedlicensetype = await LicenseType.update(article, data);

    if (!updatedlicensetype) {
      res.status(404).json({ error: 'LicenseType not found' });
      return;
    }
    res.json({
      message: 'LicenseType updated successfully',
      updatedlicensetype,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteLicenseType(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const article = String(req.params.article);

    if (!article) {
      res.status(400).json({ error: 'Invalid Article format' });
      return;
    }

    const deletedlicensetype = await LicenseType.delete(article);
    if (!deletedlicensetype) {
      res.status(404).json({ error: 'LicenseType not found' });
      return;
    }

    res.status(200).json({ message: 'License Type deleted successfully' });
  } catch (error) {
    next(error);
  }
}
