import { BaseModel } from './baseModel';

export type RepairOrderObjects = {
  [id: string]: RepairOrderModel;
};

interface RepairOrderModel extends BaseModel {
  roNumber: number;
  flagId: number;
  date: Date;
  isCompleted: boolean;
  jobs: string[];
}

class RepairOrderModel {
  // #region Props
  _id = '';
  __v = 0;
  roNumber = 0;
  // #endregion
  // #region Methods
  // #endregion
}

export default RepairOrderModel;
