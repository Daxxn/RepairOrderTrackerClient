export default interface ErrorMessenger {
  defaultImageAltText: string;

}

export default class ErrorMessenger {
  private static _errorMessenger: ErrorMessenger = {
    defaultImageAltText: 'Image not found or not loaded correctly.',
  };

  static get(): ErrorMessenger {
    return this._errorMessenger;
  }
}