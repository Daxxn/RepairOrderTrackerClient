import React from 'react';
import { HandleNewModel } from '../../../App';
import { PayPeriodObjects } from '../../../models/payPeriodModel';
import UserModel from '../../../models/userModel';
import AddButton from '../addButton';
import Card from '../material/card';
import CardHeader from '../material/card/cardHeader';
import Text from '../material/text';
import TitleCard from '../material/titleCard';
import PayPeriod from './PayPeriod';

export interface PayPeriodProps {
  payPeriodIds: string[] | null;
  handleNewModel: HandleNewModel;
}

const PayPeriods = (props: PayPeriodProps): JSX.Element => {
  const { payPeriodIds, handleNewModel } = props;
  console.log('PayPeriod Component ', payPeriodIds);
  const id = 'pay-period-list';
  const allpayPeriods = UserModel.getObjects('PayPeriods') as PayPeriodObjects;
  console.log(allpayPeriods);
  console.log('PayPeriod Data ', allpayPeriods);

  const handleAdd = () => {
    console.log('Add PayPeriod...');
    handleNewModel('PayPeriods');
  };

  return (
    <Card theme="light" key={id}>
      <CardHeader>
        <TitleCard>PayPeriods</TitleCard>
        <AddButton addModelHandler={handleAdd} />
      </CardHeader>
      {allpayPeriods && payPeriodIds && payPeriodIds.length > 0 ? (
        payPeriodIds.map(ppId => (
          <PayPeriod key={`pay-period-${ppId}`} payPeriod={allpayPeriods[ppId]} />
        ))
      ) : (
        <Text size="small">Nothing...</Text>
      )}
    </Card>
  );
};

export default PayPeriods;
