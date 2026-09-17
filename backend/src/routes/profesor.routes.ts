import { Router, IRouter } from 'express';

import {
  getProfesors,
  getProfesorsById,
  getProfesorsByDni,
  createProfesor,
  updateProfesor,
  deleteProfesor,
} from '../controllers/profesor.controller.js';

import { validateSchema } from '../middlewares/validate.middleware.js';
import {
  createProfesorSchema,
  updateProfesorSchema,
} from '../schema/profesor.schema.js';

const route: IRouter = Router();

route.get('/', getProfesors);
route.get('/:id', getProfesorsById);
route.get('/dni/:dni', getProfesorsByDni);
route.post('/', validateSchema(createProfesorSchema), createProfesor);
route.put('/:id', validateSchema(updateProfesorSchema), updateProfesor);
route.delete('/:id', deleteProfesor);

export default route;
