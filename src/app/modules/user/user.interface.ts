/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  name: string;
  password: string;
  email: string;
  image: string;
  phone: string;
  follower: number;
  role: 'admin' | 'user';
  payment: 'paid' | 'unpaid';
  isDeleted?: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
