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

class RepairOrderModel extends BaseModel {
  // #region Props
  // #endregion
  // #region Methods
  // #endregion
}

export default RepairOrderModel;
