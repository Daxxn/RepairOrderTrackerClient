import React, { useEffect, useState } from 'react';
import TechModel from '../../../models/techModel';
import Card from '../material/card';
import TitleCard from '../material/titleCard';
import Text from '../material/text';
import UserModel from '../../../models/userModel';

export interface TechProps {
  techId: string;
}

const Tech = (props: TechProps): JSX.Element => {
  const { techId } = props;
  const techInput = UserModel.getModel('Techs', techId) as TechModel;
  const [tech, setTech] = useState<TechModel>(techInput);
  const { _id, name, techNumber } = tech;
  const componentId = `tech-element-${techId}`;

  useEffect(() => {
    UserModel.appendModelObserver(componentId, 'Techs', updatedTech => {
      setTech(updatedTech as TechModel);
    });
    return () => {
      UserModel.removeModelObservers(componentId, 'Techs');
    };
  }, []);

  return (
    <Card key={`tech-item-${_id}`}>
      <TitleCard>{name}</TitleCard>
      <Text>{techNumber}</Text>
    </Card>
  );
};

export default Tech;
