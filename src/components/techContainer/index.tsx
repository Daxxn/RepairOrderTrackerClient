import React from 'react';
import { TechObjects } from '../../models/techModel';
import UserModel from '../../models/userModel';
import { HandleNewModel, HandleSelectItem } from '../../utils/eventHandlers';
import AddButton from '../componentModels/addButton';
import AllTechs from './allTechs';
import './techContainer.css';

export interface TechContainerProps {
  handleNewModel: HandleNewModel;
  handleSelectedTech: HandleSelectItem;
}

const TechContainer = (props: TechContainerProps): JSX.Element => {
  const { handleNewModel, handleSelectedTech } = props;
  const techs = UserModel.getObjects('Techs') as TechObjects;

  return (
    <div>
      <AddButton addModelHandler={() => handleNewModel('Techs')} />
      <AllTechs techs={techs} handleSelectedTech={handleSelectedTech} />
    </div>
  );
};

export default TechContainer;
