import { BaseModel } from './baseModel';

export type JobObjects = {
  [_id: string]: JobModel;
};

export default interface JobModel extends BaseModel {
  name: string;
  time: number;
  isRecall: boolean;
  assignedTech: string;
}

export default class JobModel extends BaseModel {
  //#region Props
  //#endregion
  //#region Methods
  //#endregion
}
