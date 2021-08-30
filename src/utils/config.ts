import configFile from '../.authconfig.json';
import endpointsConfig from '../endpoints.json';
import { ModelType } from '../models/userModel';

export type Endpoint = {
  [key in ModelType]: string;
};

export type UserEndpointType = 'root' | 'data' | 'userName' | 'email' | 'authId';
export type UserEndpoint = {
  [key in UserEndpointType]: string;
};

export type AuthEndpointType = 'login' | 'logout' | 'register';
export type AuthEndpoint = {
  [key in AuthEndpointType]: string;
};

export interface AuthConfig {
  useAuth: boolean;
  authDomain: string;
  authClientId: string;
  authCallbackUrl: string;
  authAudience: string;
  apiEndpoints: Endpoint;
  userEndpoints: UserEndpoint;
  authEndpoints: AuthEndpoint;
}

export interface ApiConfig {
  rootUrl: string;
  apiEndpoints: Endpoint;
  userEndpoints: UserEndpoint;
  authEndpoints: AuthEndpoint;
}

class Config {
  private static _authConfig: AuthConfig;
  private static _apiConfig: ApiConfig;

  /**
   * Only run @ startup. Initializes the .env variables.
   */
  private static buildAuthConfig(): void {
    // @ts-ignore
    this._authConfig = {
      useAuth: configFile.useAuth,
      authDomain: configFile.authDomain,
      authClientId: configFile.authClientId,
      authCallbackUrl: configFile.authCallbackUrl,
      authAudience: configFile.authAudience,
    };
  }

  private static buildApiConfig(): void {
    this._apiConfig = {
      rootUrl: endpointsConfig.rootUrl,
      apiEndpoints: endpointsConfig.apiEndpoints as Endpoint,
      userEndpoints: endpointsConfig.userEndpoints as UserEndpoint,
      authEndpoints: endpointsConfig.authEndpoints as AuthEndpoint,
    };
  }

  static getAuthConfig(): AuthConfig {
    if (!this._authConfig) {
      this.buildAuthConfig();
      console.log(this._authConfig);
    }
    return this._authConfig;
  }

  static getApiConfig(): ApiConfig {
    if (!this._apiConfig) {
      this.buildApiConfig();
      console.log(this._apiConfig);
    }
    return this._apiConfig;
  }
}

export default Config;
