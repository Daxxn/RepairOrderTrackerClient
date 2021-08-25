import { BaseModel } from './baseModel';

export type JobObjects = {
  [_id: string]: JobModel;
};

interface JobModel extends BaseModel {
  name: string;
  description: string;
  time: number;
  isRecall: boolean;
  assignedTech: string | null;
}

class JobModel {
  // #region Props
  _id = '';
  __v = 0;
  name = '';
  description = '';
  time = 0;
  isRecall = false;
  assignedTech: string | null = null;
  // #endregion
  // #region Methods
  // #endregion
}

export default JobModel;
