import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import UserModel from '../../../models/userModel';
import { RepairOrderObjects } from '../../../models/repairOrderModel';
import RepairOrder from './repairOrder';

export interface RepairOrdersProps {
  parentPayPeriodId: string | null;
  repairOrderIds: string[];
}

const RepairOrders = (props: RepairOrdersProps): JSX.Element => {
  const { repairOrderIds, parentPayPeriodId } = props;
  const repairOrders = UserModel.getObjects('RepairOrders') as RepairOrderObjects;
  
  return (
    <CardGroup key={parentPayPeriodId}>
      {repairOrderIds && repairOrderIds.length > 0 ? repairOrderIds.map(id => (
        <RepairOrder
          key={`repair-order-${id}-${parentPayPeriodId ? parentPayPeriodId : ''}`}
          repairOrder={repairOrders[id]}
        />
      )): (
        <Card.Text>No Repair Orders...</Card.Text>
      )}
    </CardGroup>
  );
};

export default RepairOrders;
