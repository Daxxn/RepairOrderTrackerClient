import React from 'react';
import { HandleNewModel, HandleSelectItem } from '../../utils/eventHandlers';
import PayPeriods from '../componentModels/payPeriods';
import TechContainer from '../techContainer';
import './dataContainer.css';

export interface DataContainerProps {
  payPeriodIds: string[];
  selectedTechId: string | null;
  handleNewModel: HandleNewModel;
  handleSelectedTech: HandleSelectItem;
}

const DataContainer = (props: DataContainerProps): JSX.Element => {
  const { payPeriodIds, selectedTechId, handleNewModel, handleSelectedTech } = props;

  return (
    <div>
      <PayPeriods
        selectedTechId={selectedTechId}
        payPeriodIds={payPeriodIds}
        handleNewModel={handleNewModel}
      />
      <TechContainer
        handleNewModel={handleNewModel}
        handleSelectedTech={handleSelectedTech}
      />
    </div>
  );
};

export default DataContainer;
