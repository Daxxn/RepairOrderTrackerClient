import React from 'react';
import PayPeriodModel from '../../../models/payPeriodModel';
import RepairOrders from '../repairOrders';
import Card from '../material/card';
import TitleCard from '../material/titleCard';
import Accordian from '../material/accordian';

export interface PayPeriodProps {
  payPeriod: PayPeriodModel;
}

const PayPeriod = (props: PayPeriodProps): JSX.Element => {
  const { payPeriod } = props;

  return (
    <Card>
      <TitleCard>Pay Period</TitleCard>
      <Accordian flexDirection="row" buttonPosition="right">
        <RepairOrders
          parentPayPeriodId={payPeriod._id}
          repairOrderIds={payPeriod.repairOrders}
        />
      </Accordian>
    </Card>
  );
};

export default PayPeriod;
