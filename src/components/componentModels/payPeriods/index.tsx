import React, { useState, useEffect } from 'react';
import { CardColumns, Card } from 'react-bootstrap';
import { PayPeriodObjects } from '../../../models/payPeriodModel';
import UserModel from '../../../models/userModel';
import PayPeriod from './PayPeriod';

export interface PayPeriodProps {
  
}

const PayPeriods = (props: PayPeriodProps): JSX.Element => {
  const id = 'payperiod-list';
  const allpayPeriods = UserModel.getObjects('PayPeriods') as PayPeriodObjects;
  const [user, setUser] = useState<UserModel | null>(UserModel.getUser());

  useEffect(() => {
    UserModel.append(id, (updatedUser) => {
      setUser(updatedUser);
    });
    return () => {
      UserModel.remove(id);
    }
  }, []);

  return (
    <CardColumns>
      <Card>
        <Card.Header>
          <Card.Title>Main Tree</Card.Title>
        </Card.Header>
        <Card.Body>
          {user ? user.payPeriods.map(id => (
            <PayPeriod key={`pay-period-${id}`} payPeriod={allpayPeriods[id]} />
          )) : (
            <p>Nothing...</p>
          )}
        </Card.Body>
      </Card>
    </CardColumns>
  );
};

export default PayPeriods;
