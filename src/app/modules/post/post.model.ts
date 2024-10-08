import { Schema } from 'mongoose';
import { TPost } from './post.interface';
import { model } from 'mongoose';

const postSchema = new Schema<TPost>(
  {
    image: {
      type: String,
    },
    tips: {
      type: [String],
      default: ['no tips available'],
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    disLike: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const PostModel = model<TPost>('Post', postSchema);
