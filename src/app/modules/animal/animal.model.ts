import { Schema } from 'mongoose';
import { TAnimal } from './animal.interface';
import { model } from 'mongoose';

const animalSchema = new Schema<TAnimal>(
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

export const Animal = model<TAnimal>('Animal', animalSchema);
