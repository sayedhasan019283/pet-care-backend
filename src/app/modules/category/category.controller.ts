import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfully',
    data: result,
  });
});

const allCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category got successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.deleteCategory(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category deleted successfully',
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  deleteCategory,
  allCategory
};
