import React, { useState, useEffect } from 'react';
import { PayPeriodObjects } from '../../../models/payPeriodModel';
import UserModel from '../../../models/userModel';
import Card from '../material/card';
import Text from '../material/text';
import TitleCard from '../material/titleCard';
import PayPeriod from './PayPeriod';

const PayPeriods = (): JSX.Element => {
  const id = 'payperiod-list';
  const allpayPeriods = UserModel.getObjects('PayPeriods') as PayPeriodObjects;
  const [user, setUser] = useState<UserModel | null>(UserModel.getUser());

  useEffect(() => {
    UserModel.append(id, updatedUser => {
      setUser(updatedUser);
    });
    return () => {
      UserModel.remove(id);
    };
  }, []);

  return (
    <Card row={2} theme="light">
      <TitleCard>PayPeriods</TitleCard>
      {user ? (
        user.payPeriods.map(ppId => (
          <PayPeriod key={`pay-period-${ppId}`} payPeriod={allpayPeriods[ppId]} />
        ))
      ) : (
        <Text size="small">Nothing...</Text>
      )}
    </Card>
  );
};

export default PayPeriods;
