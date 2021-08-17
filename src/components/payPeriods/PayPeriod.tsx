import React from 'react';
import PayPeriodModel from '../../models/payPeriodModel';

export interface PayPeriodProps {
  payPeriod: PayPeriodModel;
}

const PayPeriod = (props: PayPeriodProps): JSX.Element => {
  const { payPeriod } = props;
  
  return (
    <div>
      
    </div>
  );
};

export default PayPeriod;
