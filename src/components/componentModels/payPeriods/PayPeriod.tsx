import React, { useState, useEffect } from 'react';
import PayPeriodModel from '../../../models/payPeriodModel';
import RepairOrders from '../repairOrders';
import Card from '../material/card';
import TitleCard from '../material/titleCard';
import Accordian from '../material/accordian';
import UserModel from '../../../models/userModel';
import DateViewer from '../material/dateViewer';
import { HandleNewModel } from '../../../utils/eventHandlers';

export interface PayPeriodProps {
  payPeriodId: string;
  handleNewModel: HandleNewModel;
}

const PayPeriod = (props: PayPeriodProps): JSX.Element => {
  const { payPeriodId, handleNewModel } = props;
  const payPeriodInput = UserModel.getModel('PayPeriods', payPeriodId) as PayPeriodModel;
  const [payPeriod, setPayPeriod] = useState<PayPeriodModel>(payPeriodInput);
  const id = `pay-period-item-${payPeriodId ?? 'null'}`;

  useEffect(() => {
    UserModel.appendModelObserver(id, 'PayPeriods', updatedPayPeriod => {
      setPayPeriod(updatedPayPeriod as PayPeriodModel);
    });
    return () => {
      UserModel.removeModelObservers(id, 'PayPeriods');
    };
  }, []);

  return (
    <Card>
      <TitleCard>Pay Period</TitleCard>
      <p className="label">Start Date</p>
      <DateViewer date={payPeriod.startDate} />
      <p className="label">End Date</p>
      <DateViewer date={payPeriod.endDate} />
      <Accordian flexDirection="row" buttonPosition="right">
        <RepairOrders
          handleNewModel={handleNewModel}
          parentPayPeriodId={payPeriod._id}
          repairOrderIds={payPeriod.repairOrders}
        />
      </Accordian>
    </Card>
  );
};

export default PayPeriod;
