import { Request, Response, NextFunction } from 'express';
import { Subject } from '../models/index.js';
export async function getAllSubjects(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const subjects = await Subject.findAll();
    res.json(subjects);
  } catch (error) {
    next(error);
  }
}

export async function getByCUPOF(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const cupof = Number(req.params.cupof);

    if (isNaN(cupof)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    const subject = await Subject.findByCUPOF(cupof);

    if (!subject) {
      res.status(404).json({ error: 'Subject not found' });
      return;
    }

    res.json(subject);
  } catch (error) {
    next(error);
  }
}

export async function createSubject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { ...data } = req.body;

    const newSubject = await Subject.create({ ...data });

    res.status(201).json(newSubject);
  } catch (error) {
    next(error);
  }
}

export async function updateSubject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const cupof = Number(req.params.cupof);

    if (isNaN(cupof)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const data = req.body;
    const updatedSubject = await Subject.update(cupof, data);

    if (!updatedSubject) {
      res.status(404).json({ error: 'Subject not found' });
      return;
    }

    res.json({ message: 'Subject upated successfully', updatedSubject });
  } catch (error) {
    next(error);
  }
}

export async function deleteSubject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const cupof = Number(req.params.cupof);

    if (isNaN(cupof)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    const deletedSubject = await Subject.delete(cupof);

    if (!deletedSubject) {
      res.status(404).json({ error: 'Subject not found' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Subject deleted successfully', deletedSubject });
  } catch (error) {
    next(error);
  }
}
