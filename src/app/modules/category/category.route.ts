import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import createCategoryValidationSchema from './category.validation';
import { categoryControllers } from './category.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../auth/auth.const';

const router = express.Router();

router.post(
  '/create-category',
  auth(USER_ROLE.admin),
  validateRequest(createCategoryValidationSchema),
  categoryControllers.createCategory,
);

router.get('/', categoryControllers.allCategory);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  categoryControllers.deleteCategory,
);

export const CategoryRoutes = router;
