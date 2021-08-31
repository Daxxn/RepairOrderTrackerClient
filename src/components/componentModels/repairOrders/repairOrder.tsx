import React, { useState, useEffect } from 'react';
import Card from '../material/card';
import RepairOrderModel from '../../../models/repairOrderModel';
import Title from '../material/title';
import Text from '../material/text';
import Jobs from '../jobs';
import UserModel from '../../../models/userModel';
import DateViewer from '../material/dateViewer';
import Flag from '../flag';

export interface RepairOrderProps {
  parentId?: string;
  repairOrderId: string;
}

const RepairOrder = (props: RepairOrderProps): JSX.Element => {
  const { repairOrderId, parentId } = props;
  const repairOrder = UserModel.getModel(
    'RepairOrders',
    repairOrderId
  ) as RepairOrderModel;

  if (!repairOrder) {
    return <Text>Repair Order Load Failure..</Text>;
  }

  const [ro, setRepairOrder] = useState(repairOrder);
  const componentId = `repair-order-item-${ro._id}-${parentId ?? ''}`;

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
      <Title>RO {ro.roNumber}</Title>
      <DateViewer date={ro.date} />
      <Text>{ro.isCompleted ? 'Completed' : 'Not Completed'}</Text>
      <Flag flagNumber={ro.flagId} />
      <Jobs jobIds={ro.jobs} parentId={ro._id} />
    </Card>
  );
};

export default RepairOrder;
