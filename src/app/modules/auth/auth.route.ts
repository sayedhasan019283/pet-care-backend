import express from 'express';
import { AuthValidations } from './auth.validation';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from '../user/user.validation';
import { userControllers } from '../user/user.controller';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
  userControllers.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  authControllers.loginUser,
);

export const AuthRoutes = router;
