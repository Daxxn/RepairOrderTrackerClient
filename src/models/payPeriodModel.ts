import { BaseModel } from './baseModel';

export type PayPeriodObjects = {
  [_id: string]: PayPeriodModel;
};

interface PayPeriodModel extends BaseModel {
  startDate: Date;
  endDate: Date;
  repairOrders: string[];
}

class PayPeriodModel extends BaseModel {
  // #region Props
  // #endregion
  // #region Methods
  // #endregion
}

export default PayPeriodModel;
