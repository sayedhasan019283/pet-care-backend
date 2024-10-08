import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { animalServices } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const result = await animalServices.createPostIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post created successfully',
    data: result,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const result = await animalServices.getAllPostFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post got successfully',
    data: result,
  });
});

const findPostById = catchAsync(async (req, res) => {
  const result = await animalServices.postFindById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post got successfully',
    data: result,
  });
});

const updatePostById = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.user;

  const result = await animalServices.updatePostFromDB(
    postId,
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post updated successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.user;

  const result = await animalServices.deletePost(postId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post deleted successfully',
    data: result,
  });
});

const updatePostByAdmin = catchAsync(async (req, res) => {
  const postId = req.params.id;

  const result = await animalServices.updatePostByAdmin(postId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post updated successfully',
    data: result,
  });
});

const deletePostByAdmin = catchAsync(async (req, res) => {
  const postId = req.params.id;

  const result = await animalServices.deletePostByAdmin(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post deleted successfully',
    data: result,
  });
});

const upVote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await animalServices.incrementUpVote(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'liked',
    data: result,
  });
});

const downVote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await animalServices.incrementDownVote(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'disLiked',
    data: result,
  });
});

export const postControllers = {
  createPost,
  getAllPost,
  updatePostById,
  updatePostByAdmin,
  deletePost,
  deletePostByAdmin,
  upVote,
  downVote,
  findPostById

};
