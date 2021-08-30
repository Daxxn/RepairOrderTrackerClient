import Cookies from 'js-cookie';
import Config, { UserEndpointType, ApiConfig } from './config';

export type FetchInit = {
  url: string;
  requestInit: RequestInit;
};

class UrlHelper {
  // #region Props
  private static config: ApiConfig = Config.getApiConfig();
  private static headers: {
    'Content-Type': 'application/json';
    // eslint-disable-next-line prettier/prettier
    'Authorization': `Bearer `;
  };
  // #endregion

  // #region Methods
  static buildUserUrl(
    endpoint: UserEndpointType,
    id?: string,
    method?: string,
    /* eslint-disable */
    body?: any
  ): FetchInit {
    return {
      url: `${this.config.rootUrl}api/users/${endpoint}${id || ''}`,
      requestInit: {
        method: method ?? 'GET',
        credentials: 'include',
        headers: this.buildHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      },
    };
  }

  private static buildHeaders(): HeadersInit {
    const authToken = Cookies.get('authToken');

    if (authToken) {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  }
  // #endregion
}

export default UrlHelper;
