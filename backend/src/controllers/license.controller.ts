import { Request, Response, NextFunction } from 'express';
import { License } from '../models/index.js';

export async function getAllLicense(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const licenses = await License.findAll();

    res.json(licenses);
  } catch (error) {
    next(error);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    const license = await License.findById(id);

    if (!license) {
      res.status(404).json({ error: 'License not found' });
      return;
    }

    res.json(license);
  } catch (error) {
    next(error);
  }
}

export async function createLicense(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { ...data } = req.body;

    const newLicense = await License.create({
      ...data,
    });

    res.status(201).json(newLicense);
  } catch (error) {
    next(error);
  }
}

export async function updateLicense(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    const data = req.body;

    const updatedLicense = await License.update(id, data);

    if (!updatedLicense) {
      res.status(404).json({ error: 'License not found' });
      return;
    }
    res.json({ message: 'License updated successfully', updatedLicense });
  } catch (error) {
    next(error);
  }
}

export async function deleteLicense(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    const deletedLicense = await License.delete(id);

    if (!deletedLicense) {
      res.status(404).json({ error: 'License not found' });
      return;
    }
    res.json({ message: 'License deleted successfully', deletedLicense });
  } catch (error) {
    next(error);
  }
}
