import { User } from '@auth0/auth0-react';
import UserModel, { BaseType, ModelType, UserData } from '../models/userModel';
import {
  BasicResponse,
  NewCompleteModelResponse,
  NewModelResponse,
  UserInfoResponse,
} from './responseTypes';
import UrlHelper from './urlHelper';

const postLogin = async (authId: string): Promise<UserModel> => {
  try {
    const { url, requestInit } = UrlHelper.buildUserUrl('authId', authId, 'GET');
    const response = await fetch(url, requestInit);

    const data = (await response.json()) as UserModel;
    if ('message' in data) {
      throw data;
    }
    return data;
  } catch (err) {
    console.log('from postLogin()', err);
    throw err;
  }
};

const createUser = async (user: User): Promise<UserInfoResponse | BasicResponse> => {
  try {
    const { url, requestInit } = UrlHelper.buildUserUrl('root', '', 'POST', {
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
      userName: user.preferred_username,
      authId: user.sub,
    });
    const response = await fetch(url, requestInit);

    const data = (await response.json()) as BasicResponse;
    if (data.message) {
      return data;
    }
    return data as unknown as UserInfoResponse;
  } catch (err) {
    const error = err as Error;
    console.log(err);
    return {
      message: error.message,
    } as BasicResponse;
  }
};

const fetchUserData = async (userId?: string): Promise<UserData> => {
  const { url, requestInit } = UrlHelper.buildUserUrl('data', userId, 'POST');
  const response = await fetch(url, requestInit);
  return (await response.json()) as unknown as UserData;
};

// #region Gen 1
// export async function createNewModel(
//   type: ModelType,
//   parentId?: string
// ): Promise<UserModel> {
//   const { url, requestInit } = UrlHelper.buildModelUrl(type, parentId);
//   const response = await fetch(url, requestInit);
//   return response.json() as unknown as UserModel;
// }
// #endregion

// #region Gen 2
const createNewModel = async (
  type: ModelType,
  parentId?: string
): Promise<NewModelResponse> => {
  const { url, requestInit } = UrlHelper.buildModelUrl(type, parentId);
  const response = await fetch(url, requestInit);
  return (await response.json()) as unknown as NewModelResponse;
};
const createNewCompleteModel = async (
  type: ModelType,
  newModel: BaseType
): Promise<NewCompleteModelResponse> => {
  const { url, requestInit } = UrlHelper.buildModelUrl(
    type,
    undefined,
    'complete',
    'POST',
    newModel
  );
  const response = await fetch(url, requestInit);
  return (await response.json()) as unknown as NewCompleteModelResponse;
};
// #endregion

const createNewPayPeriod = async (): Promise<NewModelResponse> => {
  const { url, requestInit } = UrlHelper.buildModelUrl('PayPeriods');
  const response = await fetch(url, requestInit);
  return (await response.json()) as unknown as NewModelResponse;
};

const updateModel = async (type: ModelType, model: BaseType): Promise<BaseType> => {
  const { url, requestInit } = UrlHelper.buildModelUrl(
    type,
    model._id,
    undefined,
    'PATCH',
    model
  );
  const response = await fetch(url, requestInit);
  return (await response.json()) as unknown as BaseType;
};

export {
  postLogin,
  createUser,
  fetchUserData,
  createNewModel,
  createNewCompleteModel,
  createNewPayPeriod,
  updateModel,
};
