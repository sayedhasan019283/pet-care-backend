import { ObjectId } from 'mongoose';

export type TPost = {
  description: string;
  tips?: string[];
  image: string;
  category: ObjectId;
  user: ObjectId;
  like?: number;
  disLike?: number;
};
