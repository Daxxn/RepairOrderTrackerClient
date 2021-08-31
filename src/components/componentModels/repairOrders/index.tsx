import React from 'react';
import RepairOrder from './repairOrder';
import Card from '../material/card';
import Text from '../material/text';
import './repairOrders.css';

export interface RepairOrdersProps {
  parentPayPeriodId?: string;
  repairOrderIds: string[];
}

const RepairOrders = (props: RepairOrdersProps): JSX.Element => {
  const { repairOrderIds, parentPayPeriodId } = props;

  return (
    <Card>
      {repairOrderIds && repairOrderIds.length > 0 ? (
        repairOrderIds.map(id => (
          <RepairOrder
            key={`repair-order-${id}-${parentPayPeriodId ?? ''}`}
            parentId={parentPayPeriodId}
            repairOrderId={id}
          />
        ))
      ) : (
        <Text>No Repair Orders...</Text>
      )}
    </Card>
  );
};

export default RepairOrders;
