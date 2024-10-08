import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully',
    token: result?.accessToken,
    data: result?.resUser,
  });
});

const allUser = catchAsync(async (req, res) => {
  const result = await userServices.allUserFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await userServices.getUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateUserMe = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await userServices.updateUserMeFromDB(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const updateUserOnlyAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.updateUserMeFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

const toggleRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.toggleRoleInDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user role updated',
    data: result,
  });
});

const incrementFollower = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.incrementFollower(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'follower increased',
    data: result,
  });
});

export const userControllers = {
  createUser,
  allUser,
  getUser,
  updateUserMe,
  toggleRole,
  deleteUser,
  updateUserOnlyAdmin,
  incrementFollower,
};
