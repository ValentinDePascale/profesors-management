import { Request, Response, NextFunction } from 'express';
import { Prisma } from '../generated/prisma/index.js';

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error capturado en la API:', error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const campos = (error.meta?.target as string[])?.join(', ') || 'campo';
      res.status(409).json({
        exito: false,
        error: `Ya existe un registro con ese ${campos}.`,
      });
      return;
    }

    if (error.code === 'P2025') {
      res.status(404).json({
        exito: false,
        error: 'El registro solicitado no existe en la base de datos.',
      });
      return;
    }
  }

  res.status(500).json({
    exito: false,
    error: 'Error interno del servidor',
    ...(process.env.NODE_ENV !== 'production' && {
      mensajeTecnico: error.message,
    }),
  });
}
