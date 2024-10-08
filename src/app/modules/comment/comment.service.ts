import { TComment } from './comment.interface';
import { Comment } from './comment.model';

const addComment = async (payload: TComment) => {
  const result = await Comment.create(payload);
  return result;
};

const getAllComment = async () => {
  const result = await Comment.find();
  return result;
};

const getCommentById = async (id: string) => {
  const result = await Comment.findById(id);

  return result;
};

export const commentServices = {
  addComment,
  getAllComment,
  getCommentById,
};
