import { BaseModel } from './baseModel';

export type TechObjects = {
  [id: string]: TechModel;
};

interface TechModel extends BaseModel {
  name: string;
  techNumber: number;
}

class TechModel {
  // #region Props
  _id = '';
  __v = 0;
  userId = '';
  name = '';
  techNumber = 0;
  // #endregion
  // #region Methods
  // #endregion
}

export default TechModel;
