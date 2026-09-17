import { Request, Response, NextFunction } from 'express';
import { Profesor } from '../models/index.js';
export async function getProfesors(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const profesores = await Profesor.findAll();
    res.json(profesores);
  } catch (error) {
    next(error);
  }
}

export async function getProfesorsById(
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

    const profesor = await Profesor.findById(id);

    if (!profesor) {
      res.status(404).json({ error: 'Profesor not found' });
      return;
    }

    res.json(profesor);
  } catch (error) {
    next(error);
  }
}

export async function getProfesorsByDni(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dni = String(req.params.dni);
    const profesor = await Profesor.findByDNI(dni);

    if (!profesor) {
      res.status(404).json({ error: 'Profesor not found' });
      return;
    }

    res.json(profesor);
  } catch (error) {
    next(error);
  }
}

export async function createProfesor(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { birthdate, ...data } = req.body;
    const newProfesor = await Profesor.create({
      ...data,
      birthdate: new Date(birthdate),
    });

    res.status(201).json(newProfesor);
  } catch (error) {
    next(error);
  }
}

export async function updateProfesor(
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
    if (data.birthdate) {
      data.birthdate = new Date(data.birthdate);
    }

    const updatedProfesor = await Profesor.update(id, data);

    if (!updatedProfesor) {
      res.status(404).json({ error: 'Profesor not found' });
      return;
    }

    res.json({ message: 'Profesor updated successfully', updatedProfesor });
  } catch (error) {
    next(error);
  }
}

export async function deleteProfesor(
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

    const deletedProfesor = await Profesor.delete(id);

    if (!deletedProfesor) {
      res.status(404).json({ error: 'Profesor not found' });
      return;
    }

    res.status(200).json({ message: 'Profesor deleted successfully' });
  } catch (error) {
    next(error);
  }
}
