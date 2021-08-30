import UserModel from '../models/userModel';

export type BasicResponse = {
  message: string;
};

export type DeleteModelResponse = {
  message: string;
  count: number;
};

export type UserInfoResponse = {
  isNewUser: boolean;
  user: UserModel;
};
