import React from 'react';
import { HandleNewModel } from '../../App';
import PayPeriods from '../componentModels/payPeriods';
import Techs from '../componentModels/techs';
import './dataContainer.css';

export interface DataContainerProps {
  payPeriodIds: string[];
  techIds: string[];
  handleNewModel: HandleNewModel;
}

const DataContainer = (props: DataContainerProps): JSX.Element => {
  const { payPeriodIds, techIds, handleNewModel } = props;

  return (
    <div>
      <PayPeriods payPeriodIds={payPeriodIds} handleNewModel={handleNewModel} />
      <Techs displayAllTechs techIds={techIds} />
    </div>
  );
};

export default DataContainer;
