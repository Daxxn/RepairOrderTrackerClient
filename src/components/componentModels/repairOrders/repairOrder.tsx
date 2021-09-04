import React, { useState, useEffect } from 'react';
import Card from '../material/card';
import RepairOrderModel from '../../../models/repairOrderModel';
// import Title from '../material/title';
import Text from '../material/text';
import Jobs from '../jobs';
import UserModel from '../../../models/userModel';
import DateViewer from '../material/dateViewer';
import Flag from '../flag';
import JobSearchList from '../searchLists/jobSearchList';
import DataItem from '../material/dataItem';
import Switch from '../material/switch';

export interface RepairOrderProps {
  parentId?: string;
  repairOrderId: string;
  selectedTechId: string | null;
}

const RepairOrder = (props: RepairOrderProps): JSX.Element => {
  const { repairOrderId, parentId, selectedTechId } = props;
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

  const handleSetJobs = (jobIds: string[]) => {
    UserModel.setModel('RepairOrders', {
      ...ro,
      jobs: jobIds,
    });
  };

  const handleEditComplete = () => {
    UserModel.setModel('RepairOrders', ro);
  };

  const handleEditChange = (prop: string, value: string | number) => {
    setRepairOrder({
      ...ro,
      [prop]: value,
    });
  };

  const handleSwitchChange = (prop: string, value: boolean) => {
    UserModel.setModel('RepairOrders', {
      ...ro,
      [prop]: value,
    });
  };

  return (
    <Card>
      {/* <Title>RO {ro.roNumber}</Title> */}
      <DataItem
        handleEditChange={handleEditChange}
        handleEditComplete={handleEditComplete}
        value={ro.roNumber}
        title="RO Number"
        prop="roNumber"
      />
      <DateViewer date={ro.date} />
      {/* <Text>{ro.isCompleted ? 'Completed' : 'Not Completed'}</Text> */}
      <Switch
        value={ro.isCompleted}
        handleSetSwitch={value => handleSwitchChange('isCompleted', value)}
      />
      <Flag flagNumber={ro.flagId} />
      <JobSearchList
        jobIds={repairOrder.jobs}
        parentId={repairOrderId}
        handleConfirm={handleSetJobs}
      />
      <Jobs jobIds={ro.jobs} parentId={ro._id} selectedTechId={selectedTechId} />
    </Card>
  );
};

export default RepairOrder;
