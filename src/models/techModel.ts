import { BaseModel } from './baseModel';

export type TechObjects = {
  [id: string]: TechModel;
};

export default interface TechModel extends BaseModel {
  name: string;
  techId: number;
  activeJobs: string[];
}

export default class TechModel extends BaseModel {
  //#region Props
  //#endregion
  //#region Methods
  //#endregion
}
