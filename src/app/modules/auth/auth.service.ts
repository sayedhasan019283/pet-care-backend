/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';

const loginUser = async (payload: TLogin) => {
  const { email, password } = payload;

  // check user exist or not
  const user = await User.findOne({ email: email }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user not found');
  }

  //password matched or not
  const hashPassword = user?.password;
  const isPasswordMatch = await User.isPasswordMatched(password, hashPassword);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'password not matched!!!');
  }

  //   jwt access token
  type TJWTPayload = {
    userId: any;
    role: 'admin' | 'user';
    email: string;
    image: string;
    name: string;
  };

  const jwtPayload: TJWTPayload = {
    userId: user?._id,
    role: user?.role,
    email: user?.email,
    image: user?.image,
    name: user?.name,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expire_in as string,
  );

  const userRes = await User.findOne({ email: email });

  return { accessToken, userRes };
};

export const authServices = {
  loginUser,
};
