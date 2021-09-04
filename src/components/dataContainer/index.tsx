import React from 'react';
import {
  HandleAddCompleteModel,
  HandleNewModel,
  HandleSelectItem,
} from '../../utils/eventHandlers';
import PayPeriods from '../componentModels/payPeriods';
import TechContainer from '../techContainer';
import './dataContainer.css';

export interface DataContainerProps {
  payPeriodIds: string[];
  selectedTechId: string | null;
  handleNewModel: HandleNewModel;
  handleAddCompleteModel: HandleAddCompleteModel;
  handleSelectedTech: HandleSelectItem;
}

const DataContainer = (props: DataContainerProps): JSX.Element => {
  const {
    payPeriodIds,
    selectedTechId,
    handleNewModel,
    handleAddCompleteModel,
    handleSelectedTech,
  } = props;

  return (
    <div>
      <PayPeriods
        selectedTechId={selectedTechId}
        payPeriodIds={payPeriodIds}
        handleNewModel={handleNewModel}
      />
      <TechContainer
        handleAddCompleteModel={handleAddCompleteModel}
        handleSelectedTech={handleSelectedTech}
      />
    </div>
  );
};

export default DataContainer;
