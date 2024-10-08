import { User } from './../user/user.model';
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TAnimal } from './animal.interface';
import { Animal } from './animal.model';

const createAnimalIntoDB = async (payload: TAnimal) => {
  const userExist = await User.findById(payload.user);

  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const result = await Animal.create(payload);
  return result;
};

const getAllAnimalFromDB = async () => {
  const result = await Animal.find()
    .populate('user')
    .populate('category')
    .sort({ createdAt: -1, like: -1 });

  return result;
};

const animalFindById = async (id: string) => {
  const result = await Animal.findById(id);

  return result;
};

const userUpdateHisPostFromDB = async (
  postId: string,
  userId: string,
  payload: TAnimal,
) => {
  const postExist = await Animal.findById(postId);

  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'post not found');
  }

  if (postExist.user.toString() !== userId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This is not your post');
  }

  const result = await Animal.findByIdAndUpdate(postId, payload, { new: true });

  return result;
};

const userDeleteHisOwnPost = async (postId: string, userId: string) => {
  const postExist = await Animal.findById(postId);

  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'post not found');
  }

  if (postExist.user.toString() !== userId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This is not your post');
  }

  const result = await Animal.findByIdAndDelete(postId);

  return result;
};

const updatePostByAdmin = async (postId: string, payload: TAnimal) => {
  const result = await Animal.findByIdAndUpdate(postId, payload, { new: true });

  return result;
};

const deletePostByAdmin = async (postId: string) => {
  const result = await Animal.findByIdAndDelete(postId);

  return result;
};

const incrementLike = async (id: string) => {
  const result = await Animal.findByIdAndUpdate(
    id,
    { $inc: { like: 1 } },
    {
      new: true,
    },
  );
  return result;
};

const incrementDislike = async (id: string) => {
  const result = await Animal.findByIdAndUpdate(
    id,
    { $inc: { disLike: 1 } },
    {
      new: true,
    },
  );
  return result;
};

export const animalServices = {
  createAnimalIntoDB,
  getAllAnimalFromDB,
  userUpdateHisPostFromDB,
  updatePostByAdmin,
  userDeleteHisOwnPost,
  deletePostByAdmin,
  incrementLike,
  incrementDislike,
  animalFindById,
};
