import React from 'react';
import { Card } from 'react-bootstrap';
import RepairOrderModel from '../../../models/repairOrderModel';

export interface RepairOrderProps {
  repairOrder: RepairOrderModel;
}

const RepairOrder = (props: RepairOrderProps): JSX.Element => {
  const { repairOrder } = props;
  
  return (
    <Card>
      <Card.Header>
        <Card.Title>RO {repairOrder.roNumber}</Card.Title>
        <Card.Text>Date {repairOrder.date.toDateString()}</Card.Text>
        <Card.Text>Date {repairOrder.date.toDateString()}</Card.Text>
      </Card.Header>
      <Card.Body>
        
      </Card.Body>
    </Card>
  );
};

export default RepairOrder;
