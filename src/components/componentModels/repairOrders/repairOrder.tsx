import React from 'react';
import Card from '../material/card';
import RepairOrderModel from '../../../models/repairOrderModel';
import Title from '../material/title';
import Text from '../material/text';
import Jobs from '../jobs';

export interface RepairOrderProps {
  repairOrder: RepairOrderModel;
}

const RepairOrder = (props: RepairOrderProps): JSX.Element => {
  const { repairOrder } = props;
  const { jobs, _id } = repairOrder;

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
