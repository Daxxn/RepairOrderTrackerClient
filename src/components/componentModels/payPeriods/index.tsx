import React from 'react';
import { HandleNewModel } from '../../../utils/eventHandlers';
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
  const id = 'main-pay-period-list';

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
      {payPeriodIds && payPeriodIds.length > 0 ? (
        payPeriodIds.map(ppId => (
          <PayPeriod
            key={`pay-period-${ppId}`}
            payPeriodId={ppId}
            handleNewModel={handleNewModel}
          />
        ))
      ) : (
        <Text size="small">No Pay Periods...</Text>
      )}
    </Card>
  );
};

export default PayPeriods;
