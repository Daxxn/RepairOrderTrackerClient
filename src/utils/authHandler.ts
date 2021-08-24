import UserModel from '../models/userModel';

export default class LoginHandler {
  //#region Props

  //#endregion

  //#region Methods
  static async loginAPI(accessToken: string) {
    try {
      if (accessToken) {
        const response = await fetch('http://localhost:2000/auth/login', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = (await response.json()) as UserModel;
        UserModel.setUser(data);
      } else {
        throw new Error('Access Token is invalid.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  static logoutAPI() {}
  //#endregion
}
