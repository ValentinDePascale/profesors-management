import { Router, IRouter } from 'express';

import {
  getAllLicense,
  getById,
  createLicense,
  updateLicense,
  deleteLicense,
} from '../controllers/license.controller.js';

import { validateSchema } from '../middlewares/validate.middleware.js';
import {
  createLicenseSchema,
  updateLicenseSchema,
} from '../schema/license.schema.js';

const route: IRouter = Router();

route.get('/', getAllLicense);
route.get('/:id', getById);
route.post('/', validateSchema(createLicenseSchema), createLicense);
route.put('/:id', validateSchema(updateLicenseSchema), updateLicense);
route.delete('/:id', deleteLicense);

export default route;
