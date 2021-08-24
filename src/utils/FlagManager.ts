export type Flag = {
  number: number;
  desc: string;
};

export type FlagCollection = {
  [id: number]: Flag;
};

class FlagManager {
  // #region Props
  private static _allFlags: FlagCollection;
  // #endregion

  // #region Methods
  static getFlags(): FlagCollection {
    return this._allFlags;
  }

  static setFlags(flags: FlagCollection): void {
    this._allFlags = flags;
  }

  static setFlag(flag: Flag): void {
    this._allFlags[flag.number] = flag;
  }
  // #endregion
}

export default FlagManager;
