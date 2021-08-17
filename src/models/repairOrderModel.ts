import { BaseModel } from './baseModel';

export type RepairOrderObjects = {
  [id: string]: RepairOrderModel;
}

export default interface RepairOrderModel extends BaseModel {
  roNumber: number;
  date: Date;
  isCompleted: boolean;
  jobs: string[];
};

export default class RepairOrderModel extends BaseModel {
  //#region Props
  
  //#endregion

  //#region Methods

  //#endregion
}