import { User } from '@auth0/auth0-react';
import { UserData } from '../models/userModel';
import { BasicResponse, UserInfoResponse } from './responseTypes';
import UrlHelper from './urlHelper';

export async function postLogin(
  authId: string
): Promise<UserInfoResponse | BasicResponse> {
  try {
    const { url, requestInit } = UrlHelper.buildUserUrl('authId', authId, 'GET');
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
  const { url, requestInit } = UrlHelper.buildUserUrl('data', userId);
  const response = await fetch(url, requestInit);
  return response.json() as unknown as UserData;
}
