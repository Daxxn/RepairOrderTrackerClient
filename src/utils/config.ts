import configFile from '../.authconfig.json';

interface Config {
  useAuth: boolean;
  apiUrl: string;
  authDomain: string;
  authClientId: string;
  authCallbackUrl: string;
  authAudience: string;
}

class Config {
  private static _config: Config;

  /**
   * Only run @ startup. Initializes the .env variables.
   */
  private static buildConfig(): void {
    this._config = {
      useAuth: configFile.useAuth,
      apiUrl: configFile.apiUrl,
      authDomain: configFile.authDomain,
      authClientId: configFile.authClientId,
      authCallbackUrl: configFile.authCallbackUrl,
      authAudience: configFile.authAudience,
    };
  }

  static get(): Config {
    if (!this._config) {
      this.buildConfig();
    }
    console.log(this._config);
    return this._config;
  }
}

export default Config;
