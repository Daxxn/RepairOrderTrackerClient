import Messages from '../messages.json';

interface Messenger {
  [id: string]: string;
}

class Messenger {
  private static _errorMessenger: Messenger = {
    defaultImageAltText: 'Image not found or not loaded correctly.',
  };

  private static readMessagesFile() {
    const props = Object.entries(Messages);
    props.forEach(prop => {
      const [key, value] = prop;
      this._errorMessenger[key] = value;
    });
    console.log(props);
    console.log(this._errorMessenger);
  }

  static get(): Messenger {
    if (!this._errorMessenger) {
      this.readMessagesFile();
    }
    return this._errorMessenger;
  }

  static getMessage(key: string): string {
    if (this._errorMessenger[key]) {
      return this._errorMessenger[key];
    }
    return 'key not found';
  }
}

export default Messenger;
