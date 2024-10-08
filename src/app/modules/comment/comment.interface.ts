import { ObjectId } from 'mongoose';

export type TComment = {
    animal: ObjectId;
  email: string;
  comment: string;
};
