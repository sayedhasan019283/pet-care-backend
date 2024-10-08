import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../auth/auth.const';
import { postValidations } from './post.validation';
import { postControllers } from './post.controller';

const router = express.Router();

router.post(
  '/create-post',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(postValidations.createPostSchema),
  postControllers.createPost,
);

router.get('/', postControllers.getAllPost);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(postValidations.updatePostSchema),
  postControllers.updatePostById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  postControllers.deletePost,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  postControllers.findPostById,
);

router.patch(
  '/post-update-admin/:id',
  auth(USER_ROLE.admin),
  validateRequest(postValidations.updatePostSchema),
  postControllers.updatePostByAdmin,
);
router.delete(
  '/post-delete-admin/:id',
  auth(USER_ROLE.admin),
  postControllers.deletePostByAdmin,
);

router.patch('/like/:id', postControllers.upVote);
router.patch('/disLike/:id', postControllers.downVote);

export const PostRoutes = router;
