import React from 'react';
import { PayPeriodObjects } from '../../../models/payPeriodModel';
import UserModel from '../../../models/userModel';
import Card from '../material/card';
import Text from '../material/text';
import TitleCard from '../material/titleCard';
import PayPeriod from './PayPeriod';

export interface PayPeriodProps {
  payPeriodIds: string[] | null;
}

const PayPeriods = (props: PayPeriodProps): JSX.Element => {
  const { payPeriodIds } = props;
  console.log('PayPeriod Component ', payPeriodIds);
  const id = 'pay-period-list';
  const allpayPeriods = UserModel.getObjects('PayPeriods') as PayPeriodObjects;
  console.log('PayPeriod Data ', allpayPeriods);

  return (
    <Card row={2} theme="light" key={id}>
      <TitleCard>PayPeriods</TitleCard>
      {payPeriodIds && payPeriodIds.length > 0 ? (
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
