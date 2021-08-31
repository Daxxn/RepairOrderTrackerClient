import { User } from '@auth0/auth0-react';
import { BaseModel } from '../models/baseModel';
import UserModel, { ModelType, UserData } from '../models/userModel';
import { BasicResponse, UserInfoResponse } from './responseTypes';
import UrlHelper from './urlHelper';

export async function postLogin(authId: string): Promise<UserModel> {
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
}

export async function createuser(user: User): Promise<UserInfoResponse | BasicResponse> {
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
}

export async function fetchUserData(userId?: string): Promise<UserData> {
  const { url, requestInit } = UrlHelper.buildUserUrl('data', userId, 'POST');
  const response = await fetch(url, requestInit);
  return response.json() as unknown as UserData;
}

export async function createNewModel(type: ModelType): Promise<UserModel> {
  const { url, requestInit } = UrlHelper.buildModelUrl(type);
  const response = await fetch(url, requestInit);
  return response.json() as unknown as UserModel;
}
