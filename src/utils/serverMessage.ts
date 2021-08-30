import serverMessages from '../serverMessages.json';

export type Messages = {
  [key: string]: string;
};

export default class ServerMessage {
  private static _serverMessages: Messages = {};

  private static buildMessages(): void {
    const entries = Object.entries(serverMessages);
    entries.forEach(entry => {
      const [key, value] = entry;
      this._serverMessages[key] = value;
    });
  }

  /**
   * get
   */
  public static get(): Messages {
    if (!this._serverMessages) {
      this.buildMessages();
    }
    return this._serverMessages;
  }
}
