import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export const validateSchema =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        exito: false,
        error: 'Los datos de entrada son inválidos',
        detalles: result.error.issues.map((issue) => ({
          campo: issue.path.join('.'),
          mensaje: issue.message,
        })),
      });
      return;
    }

    req.body = result.data;
    next();
  };
