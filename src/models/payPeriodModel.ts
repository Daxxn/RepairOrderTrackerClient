import { BaseModel } from './baseModel';

export type PayPeriodObjects = {
  [_id: string]: PayPeriodModel;
};

interface PayPeriodModel extends BaseModel {
  // startDate: Date;
  // endDate: Date;
  startDate: string;
  endDate: string;
  repairOrders: string[];
}

class PayPeriodModel {
  // #region Props
  _id = '';
  __v = 0;
  userId = '';
  // startDate: Date = new Date(Date.now());
  // endDate: Date = new Date(Date.now());
  startDate = '';
  endDate = '';
  repairOrders: string[] = [];
  // #endregion
  // #region Methods
  // #endregion
}

export default PayPeriodModel;
