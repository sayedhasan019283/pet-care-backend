import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { commentValidations } from './comment.validation';
import { commentControllers } from './comment.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../auth/auth.const';

const router = express.Router();

router.post(
  '/add-comment',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(commentValidations.addCommentValidation),
  commentControllers.addComment,
);
router.get('/', commentControllers.allComment);

router.get('/:id', commentControllers.getCommentById);

export const CommentRoutes = router;
