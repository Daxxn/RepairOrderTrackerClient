import { BaseModel } from './baseModel';

export type PayPeriodObjects = {
  [_id: string]: PayPeriodModel;
}

export default interface PayPeriodModel extends BaseModel {
  startDate: Date;
  endDate: Date;
  repairOrders: string[];
};

export default class PayPeriodModel extends BaseModel {
  //#region Props
  
  //#endregion

  //#region Methods

  //#endregion
}