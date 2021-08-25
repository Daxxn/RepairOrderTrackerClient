import React, { useState, useEffect } from 'react';
import Card from '../material/card';
import RepairOrderModel from '../../../models/repairOrderModel';
import Title from '../material/title';
import Text from '../material/text';
import Jobs from '../jobs';
import UserModel from '../../../models/userModel';

export interface RepairOrderProps {
  parentId?: string;
  repairOrder: RepairOrderModel;
}

const RepairOrder = (props: RepairOrderProps): JSX.Element => {
  const { repairOrder, parentId } = props;
  const { jobs, _id } = repairOrder;
  const [ro, setRepairOrder] = useState(repairOrder);
  const componentId = `repair-order-item-${_id}-${parentId ?? ''}`;

  useEffect(() => {
    UserModel.appendModelObserver(componentId, 'RepairOrders', updatedRO => {
      setRepairOrder(updatedRO as RepairOrderModel);
    });
    return () => {
      UserModel.removeModelObservers(componentId, 'RepairOrders');
    };
  }, []);

  return (
    <Card>
      <Title>RO {repairOrder.roNumber}</Title>
      <Text>Date {repairOrder.date.toDateString()}</Text>
      <Text>Date {repairOrder.date.toDateString()}</Text>
      <Jobs jobIds={jobs} parentId={_id} />
    </Card>
  );
};

export default RepairOrder;
