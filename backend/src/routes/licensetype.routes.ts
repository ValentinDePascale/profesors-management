import { Router, IRouter } from 'express';

import {
  getAllLicenseTypes,
  getLicenseTypesByArticle,
  createLicenseType,
  updateLicenseType,
  deleteLicenseType,
} from '../controllers/licensetype.controller.js';

import { validateSchema } from '../middlewares/validate.middleware.js';
import {
  createLicenseTypeSchema,
  updateLicenseTypeSchema,
} from '../schema/licensetype.schema.js';

const route: IRouter = Router();

route.get('/', getAllLicenseTypes);
route.get('/:article', getLicenseTypesByArticle);
route.post('/', validateSchema(createLicenseTypeSchema), createLicenseType);
route.put(
  '/:article',
  validateSchema(updateLicenseTypeSchema),
  updateLicenseType
);
route.delete('/:article', deleteLicenseType);

export default route;
