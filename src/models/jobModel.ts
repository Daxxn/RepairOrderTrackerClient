import { BaseModel } from './baseModel';

export type JobObjects = {
  [_id: string]: JobModel;
};

interface JobModel extends BaseModel {
  name: string;
  description: string;
  time: number;
  isRecall: boolean;
  assignedTech: string;
}

class JobModel extends BaseModel {
  // #region Props
  // #endregion
  // #region Methods
  // #endregion
}

export default JobModel;
