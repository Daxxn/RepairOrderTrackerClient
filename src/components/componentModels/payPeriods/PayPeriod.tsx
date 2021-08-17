import React from 'react';
import { Card } from 'react-bootstrap';
import PayPeriodModel from '../../../models/payPeriodModel';
import RepairOrders from '../repairOrders';

export interface PayPeriodProps {
  payPeriod: PayPeriodModel;
}

const PayPeriod = (props: PayPeriodProps): JSX.Element => {
  const { payPeriod } = props;
  
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <Card.Text>Start Date: {payPeriod.startDate.toDateString()}</Card.Text>
          <Card.Text>Start Date: {payPeriod.endDate.toDateString()}</Card.Text>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <RepairOrders parentPayPeriodId={payPeriod._id} repairOrderIds={payPeriod.repairOrders} />
      </Card.Body>
    </Card>
  );
};

export default PayPeriod;
