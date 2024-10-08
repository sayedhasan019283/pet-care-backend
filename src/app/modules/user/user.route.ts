import validateRequest from '../../middleware/validateRequest';
import express from 'express';
import { UserValidations } from './user.validation';
import { userControllers } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../auth/auth.const';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), userControllers.allUser);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userControllers.getUser,
);

router.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidations.updateUserValidationSchema),
  userControllers.updateUserMe,
);

router.put(
  '/user-update-admin/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidations.updateUserValidationSchema),
  userControllers.updateUserOnlyAdmin,
);

router.put(
  '/toggle-role/:id',
  auth(USER_ROLE.admin),
  userControllers.toggleRole,
);

router.delete(
  '/delete-user/:id',
  auth(USER_ROLE.admin),
  userControllers.deleteUser,
);

router.patch('/follower-increase/:id', userControllers.incrementFollower);

export const UserRoutes = router;
