import { BaseModel } from './baseModel';

export type TechObjects = {
  [id: string]: TechModel;
};

interface TechModel extends BaseModel {
  name: string;
  techNumber: number;
}

class TechModel extends BaseModel {
  // #region Props
  // #endregion
  // #region Methods
  // #endregion
}

export default TechModel;
