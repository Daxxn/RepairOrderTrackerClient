import UserModel, { BaseType } from '../models/userModel';

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

export type NewModelResponse = {
  parent: UserModel | BaseType;
  model: BaseType;
};
