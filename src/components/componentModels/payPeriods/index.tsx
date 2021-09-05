import React from 'react';
import { HandleNewModel } from '../../../utils/eventHandlers';
import AddButton from '../addButton';
import Accordian from '../material/accordian';
import Card from '../material/card';
import CardHeader from '../material/card/cardHeader';
import CardGroup from '../material/cardGroup';
import Text from '../material/text';
import TitleCard from '../material/titleCard';
import PayPeriod from './PayPeriod';

export interface PayPeriodProps {
  payPeriodIds: string[] | null;
  selectedTechId: string | null;
  handleNewModel: HandleNewModel;
}

const PayPeriods = (props: PayPeriodProps): JSX.Element => {
  const { payPeriodIds, selectedTechId, handleNewModel } = props;
  console.log('PayPeriod Component ', payPeriodIds);
  const id = 'main-pay-period-list';

  const handleAdd = () => {
    console.log('Add PayPeriod...');
    handleNewModel('PayPeriods');
  };

  return (
    <CardGroup key={id}>
      <CardHeader>
        <TitleCard>PayPeriods</TitleCard>
      </CardHeader>
      <Accordian>
        <AddButton addModelHandler={handleAdd} />
        {payPeriodIds && payPeriodIds.length > 0 ? (
          payPeriodIds.map(ppId => (
            <PayPeriod
              key={`pay-period-${ppId}`}
              payPeriodId={ppId}
              selectedTechId={selectedTechId}
              handleNewModel={handleNewModel}
            />
          ))
        ) : (
          <Text size="small">No Pay Periods...</Text>
        )}
      </Accordian>
    </CardGroup>
  );
};

export default PayPeriods;
