import { Router, IRouter } from 'express';

import {
  getAllSubjects,
  getByCUPOF,
  createSubject,
  updateSubject,
  deleteSubject,
} from '../controllers/subject.controller.js';

import { validateSchema } from '../middlewares/validate.middleware.js';
import {
  createSubjectSchema,
  updateSubjectSchema,
} from '../schema/subject.schema.js';

const route: IRouter = Router();

route.get('/', getAllSubjects);
route.get('/:cupof', getByCUPOF);
route.post('/', validateSchema(createSubjectSchema), createSubject);
route.put('/:cupof', validateSchema(updateSubjectSchema), updateSubject);
route.delete('/:cupof', deleteSubject);

export default route;
