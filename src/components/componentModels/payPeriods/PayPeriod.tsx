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
  selectedTechId: string | null;
  handleNewModel: HandleNewModel;
}

const PayPeriod = (props: PayPeriodProps): JSX.Element => {
  const { payPeriodId, selectedTechId, handleNewModel } = props;
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
      <TitleCard size="small" align="left">
        Pay Period
      </TitleCard>
      <DateViewer date={payPeriod.startDate} title="Start Date" />
      <DateViewer date={payPeriod.endDate} title="End Date" />
      <Accordian flexDirection="row" buttonPosition="right">
        <RepairOrders
          handleNewModel={handleNewModel}
          selectedTechId={selectedTechId}
          parentPayPeriodId={payPeriod._id}
          repairOrderIds={payPeriod.repairOrders}
        />
      </Accordian>
    </Card>
  );
};

export default PayPeriod;
