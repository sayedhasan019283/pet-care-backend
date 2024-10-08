import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { animalServices } from './animal.service';

const createAnimal = catchAsync(async (req, res) => {
  const result = await animalServices.createAnimalIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post created successfully',
    data: result,
  });
});

const getAllAnimal = catchAsync(async (req, res) => {
  const result = await animalServices.getAllAnimalFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post got successfully',
    data: result,
  });
});

const findById = catchAsync(async (req, res) => {
  const result = await animalServices.animalFindById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post got successfully',
    data: result,
  });
});

const updateOwnPost = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.user;

  const result = await animalServices.userUpdateHisPostFromDB(
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

const deleteOwnPost = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.user;

  const result = await animalServices.userDeleteHisOwnPost(postId, userId);

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

const like = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await animalServices.incrementLike(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'liked',
    data: result,
  });
});

const disLike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await animalServices.incrementDislike(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'disLiked',
    data: result,
  });
});

export const animalControllers = {
  createAnimal,
  getAllAnimal,
  updateOwnPost,
  updatePostByAdmin,
  deleteOwnPost,
  deletePostByAdmin,
  like,
  disLike,
  findById
};
