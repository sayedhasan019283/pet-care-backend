/* eslint-disable @typescript-eslint/no-explicit-any */
// checking if the user is exist

import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TUser } from './user.interface';
import config from '../../config';
import { createToken } from '../auth/auth.utils';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.isUserExistByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is already exist!');
  }

  //create new user
  const newUser = await User.create(payload);

  //create token and sent to the  client

  type TJWTPayload = {
    userId: any;
    role: 'admin' | 'user';
    email: string;
    image: string;
    name: string;
  };

  const jwtPayload: TJWTPayload = {
    userId: newUser?._id,
    role: newUser?.role,
    email: newUser?.email,
    image: newUser?.image,
    name: newUser?.name,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expire_in as string,
  );

  const resUser = await User.findOne({ email: payload?.email });

  return { accessToken, resUser };
};

const allUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const getUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateUserMeFromDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const updateUserOnlyAdmin = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const toggleRoleInDB = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  // Toggle the role
  const result = await User.findByIdAndUpdate(
    id,
    { role: user.role === 'admin' ? 'user' : 'admin' },
    { new: true },
  );
  return result;
};

const incrementFollower = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { $inc: { follower: 1 } },
    {
      new: true,
    },
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  getUserFromDB,
  updateUserMeFromDB,
  allUserFromDB,
  toggleRoleInDB,
  deleteUserFromDB,
  updateUserOnlyAdmin,
  incrementFollower,
};
