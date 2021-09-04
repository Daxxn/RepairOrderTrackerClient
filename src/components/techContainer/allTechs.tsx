import React from 'react';
import { TechObjects } from '../../models/techModel';
import { HandleSelectItem } from '../../utils/eventHandlers';
import Text from '../componentModels/material/text';
import FullTech from './fullTech';
import './techContainer.css';

export interface AllTechsProps {
  techs: TechObjects;
  handleSelectedTech: HandleSelectItem;
}

const AllTechs = (props: AllTechsProps): JSX.Element => {
  const { techs, handleSelectedTech } = props;

  return (
    <div className="Base-tech-container">
      {techs ? (
        Object.values(techs).map(tech => (
          <FullTech
            key={`full-tech-item-${tech._id}`}
            initialTech={tech}
            handleSelected={handleSelectedTech}
          />
        ))
      ) : (
        <Text>No Techs...</Text>
      )}
    </div>
  );
};

export default AllTechs;
