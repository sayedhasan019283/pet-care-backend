import { model, Schema } from 'mongoose';
import { TComment } from './comment.interface';

const commentSchema = new Schema<TComment>({
  animal: {
    type: Schema.Types.ObjectId,
    ref: 'Animal',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export const Comment = model<TComment>('Comment', commentSchema);
