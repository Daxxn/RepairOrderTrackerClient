import React from 'react';
import { TechObjects } from '../../models/techModel';
import UserModel from '../../models/userModel';
import { HandleAddCompleteModel, HandleSelectItem } from '../../utils/eventHandlers';
// import AddButton from '../componentModels/addButton';
import TechCreation from '../createModelComponents/techCreation';
import AllTechs from './allTechs';
import './techContainer.css';

export interface TechContainerProps {
  handleAddCompleteModel: HandleAddCompleteModel;
  handleSelectedTech: HandleSelectItem;
}

const TechContainer = (props: TechContainerProps): JSX.Element => {
  const { handleAddCompleteModel, handleSelectedTech } = props;
  const techs = UserModel.getObjects('Techs') as TechObjects;

  return (
    <div>
      {/* <AddButton addModelHandler={() => handleNewModel('Techs')} /> */}
      <TechCreation handleAddCompleteModel={handleAddCompleteModel} />
      <AllTechs techs={techs} handleSelectedTech={handleSelectedTech} />
    </div>
  );
};

export default TechContainer;
