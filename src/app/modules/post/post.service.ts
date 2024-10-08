import { User } from '../user/user.model';
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TPost } from './post.interface';
import { PostModel } from './post.model';

const createPostIntoDB = async (payload: TPost) => {
  const userExist = await User.findById(payload.user);

  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const result = await PostModel.create(payload);
  return result;
};

const getAllPostFromDB = async () => {
  const result = await PostModel.find()
    .populate('user')
    .populate('category')
    .sort({ createdAt: -1, like: -1 });

  return result;
};

const postFindById = async (id: string) => {
  const result = await PostModel.findById(id);

  return result;
};

const updatePostFromDB = async (
  postId: string,
  userId: string,
  payload: TPost,
) => {
  const postExist = await PostModel.findById(postId);

  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'post not found');
  }

  if (postExist.user.toString() !== userId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This is not your post');
  }

  const result = await PostModel.findByIdAndUpdate(postId, payload, { new: true });

  return result;
};

const deletePost = async (postId: string, userId: string) => {
  const postExist = await PostModel.findById(postId);

  if (!postExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'post not found');
  }

  if (postExist.user.toString() !== userId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This is not your post');
  }

  const result = await PostModel.findByIdAndDelete(postId);

  return result;
};

const updatePostByAdmin = async (postId: string, payload: TPost) => {
  const result = await PostModel.findByIdAndUpdate(postId, payload, { new: true });

  return result;
};

const deletePostByAdmin = async (postId: string) => {
  const result = await PostModel.findByIdAndDelete(postId);

  return result;
};

const incrementUpVote = async (id: string) => {
  const result = await PostModel.findByIdAndUpdate(
    id,
    { $inc: { like: 1 } },
    {
      new: true,
    },
  );
  return result;
};

const incrementDownVote = async (id: string) => {
  const result = await PostModel.findByIdAndUpdate(
    id,
    { $inc: { disLike: 1 } },
    {
      new: true,
    },
  );
  return result;
};

export const animalServices = {
  createPostIntoDB,
  getAllPostFromDB,
  updatePostFromDB,
  updatePostByAdmin,
  deletePost,
  deletePostByAdmin,
  incrementUpVote,
  incrementDownVote,
  postFindById,
};
