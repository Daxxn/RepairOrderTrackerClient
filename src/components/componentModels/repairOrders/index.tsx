import React from 'react';
import UserModel from '../../../models/userModel';
import { RepairOrderObjects } from '../../../models/repairOrderModel';
import RepairOrder from './repairOrder';
import Card from '../material/card';
import Text from '../material/text';

export interface RepairOrdersProps {
  parentPayPeriodId: string | null;
  repairOrderIds: string[];
}

const RepairOrders = (props: RepairOrdersProps): JSX.Element => {
  const { repairOrderIds, parentPayPeriodId } = props;
  const repairOrders = UserModel.getObjects('RepairOrders') as RepairOrderObjects;

  return (
    <Card>
      {repairOrderIds && repairOrderIds.length > 0 ? (
        repairOrderIds.map(id => (
          <RepairOrder
            key={`repair-order-${id}-${parentPayPeriodId ?? ''}`}
            repairOrder={repairOrders[id]}
          />
        ))
      ) : (
        <Text>No Repair Orders...</Text>
      )}
    </Card>
  );
};

export default RepairOrders;
