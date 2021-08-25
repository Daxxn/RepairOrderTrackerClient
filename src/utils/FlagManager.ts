export type Flag = {
  number: number;
  desc: string;
};

class FlagManager {
  // #region Props
  private static _allFlags: Flag[] = [];
  // #endregion

  // #region Methods
  static getFlags(): Flag[] {
    return this._allFlags;
  }

  static getFlag(number: number): Flag | null {
    console.log(this._allFlags);
    if (this._allFlags) {
      if (this._allFlags.length > number || number >= 0) {
        return this._allFlags[number];
      }
      return null;
    }
    return null;
  }

  static setFlags(flags: Flag[]): void {
    if (this._allFlags) {
      this._allFlags = flags;
    }
  }

  static setFlag(flag: Flag): void {
    if (this._allFlags) {
      this._allFlags[flag.number] = flag;
    }
  }
  // #endregion
}

export default FlagManager;
