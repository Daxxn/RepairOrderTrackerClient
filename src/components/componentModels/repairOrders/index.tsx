import React from 'react';
import RepairOrder from './repairOrder';
import Card from '../material/card';
import Text from '../material/text';
import './repairOrders.css';
import { HandleNewModel } from '../../../App';
import CardHeader from '../material/card/cardHeader';
import TitleCard from '../material/titleCard';
import AddButton from '../addButton';

export interface RepairOrdersProps {
  parentPayPeriodId?: string;
  repairOrderIds: string[];
  handleNewModel: HandleNewModel;
}

const RepairOrders = (props: RepairOrdersProps): JSX.Element => {
  const { repairOrderIds, parentPayPeriodId, handleNewModel } = props;

  return (
    <Card>
      <CardHeader>
        <TitleCard>Repair Orders</TitleCard>
        <AddButton
          addModelHandler={() =>
            handleNewModel('RepairOrders', 'PayPeriods', parentPayPeriodId)
          }
        />
      </CardHeader>
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
