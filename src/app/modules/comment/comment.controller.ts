import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { commentServices } from './comment.service';

const addComment = catchAsync(async (req, res) => {
  const result = await commentServices.addComment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'comment added',
    data: result,
  });
});

const allComment = catchAsync(async (req, res) => {
  const result = await commentServices.getAllComment();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'comment got successfully',
    data: result,
  });
});

const getCommentById = catchAsync(async (req, res) => {
  const result = await commentServices.getCommentById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'comment got successfully',
    data: result,
  });
});

export const commentControllers = {
  getCommentById,
  allComment,
  addComment,
};
