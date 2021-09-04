import React, { useEffect, useState } from 'react';
import TechModel from '../../models/techModel';
import UserModel from '../../models/userModel';
import { HandleSelectItem } from '../../utils/eventHandlers';
import Card from '../componentModels/material/card';
import DataItem from '../componentModels/material/dataItem';
import Selectable from '../componentModels/material/selectable';
import TitleCard from '../componentModels/material/titleCard';

export interface FullTechProps {
  initialTech: TechModel;
  handleSelected: HandleSelectItem;
}

const FullTech = (props: FullTechProps): JSX.Element => {
  const { initialTech, handleSelected } = props;
  const [tech, setTech] = useState<TechModel>(initialTech);
  const componentId = `full-tech-item-${tech._id}`;

  useEffect(() => {
    UserModel.appendModelObserver(componentId, 'Techs', updatedTech => {
      setTech(updatedTech as TechModel);
    });
    return () => {
      UserModel.removeModelObservers(componentId, 'Techs');
    };
  }, []);

  const handleEditChange = (prop: string, value: string | number) => {
    const tempValue = Number.parseInt(value as string, 10);
    if (Number.isNaN(tempValue)) {
      setTech({
        ...tech,
        [prop]: tempValue,
      });
    } else {
      setTech({
        ...tech,
        [prop]: value,
      });
    }
  };

  const handleEditComplete = () => {
    UserModel.setModel('Techs', tech);
  };
  return (
    <Card>
      <Selectable onClick={() => handleSelected(tech._id)}>
        <TitleCard>{tech.name}</TitleCard>
        <DataItem
          prop="name"
          value={tech.name}
          title="Name"
          handleEditChange={handleEditChange}
          handleEditComplete={handleEditComplete}
        />
        <DataItem
          prop="techNumber"
          value={tech.techNumber}
          title="Tech Number"
          handleEditChange={handleEditChange}
          handleEditComplete={handleEditComplete}
        />
      </Selectable>
    </Card>
  );
};

export default FullTech;
