import { ModelType } from '../models/userModel';
import Messenger from './ErrorMessenger';

const modelToString = (type: ModelType): string => {
  switch (type) {
    case 'PayPeriods':
      return 'Pay Period';
    case 'RepairOrders':
      return 'Repair Order';
    case 'Jobs':
      return 'Job';
    case 'Techs':
      return 'Tech';
    default:
      throw new Error(Messenger.getMessage('unknownArgumentType'));
  }
};

export default modelToString;
