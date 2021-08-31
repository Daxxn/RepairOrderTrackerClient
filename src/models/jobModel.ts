import { BaseModel } from './baseModel';

export type JobObjects = {
  [_id: string]: JobModel;
};

interface JobModel extends BaseModel {
  name: string;
  description: string;
  time: number;
  isRecall: boolean;
  isCompleted: boolean;
  assignedTech: string | null;
}

class JobModel {
  // #region Props
  _id = '';
  __v = 0;
  userId = '';
  name = '';
  description = '';
  time = 0;
  isRecall = false;
  isCompleted = false;
  assignedTech: string | null = null;
  // #endregion
  // #region Methods
  // #endregion
}

export default JobModel;
