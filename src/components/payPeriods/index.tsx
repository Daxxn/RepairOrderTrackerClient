import React from 'react';
import { PayPeriodObjects } from '../../models/payPeriodModel';
import UserModel from '../../models/userModel';
import PayPeriod from './PayPeriod';

export interface PayPeriodProps {
  
}

const PayPeriods = (props: PayPeriodProps): JSX.Element => {
  const user = UserModel.getUser();
  const allpayPeriods = UserModel.getObjects('PayPeriods') as PayPeriodObjects;

  return (
    <>
      {user ? user.payPeriods.map(pp => (
        <PayPeriod payPeriod={allpayPeriods[pp]} />
      )) : (
        <p>Nothing...</p>
      )}
    </>
  );
};

export default PayPeriods;
