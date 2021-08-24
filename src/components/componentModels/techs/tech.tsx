import React from 'react';
import TechModel from '../../../models/techModel';
import Card from '../material/card';
import TitleCard from '../material/titleCard';
import Text from '../material/text';
import Jobs from '../jobs';

export interface TechProps {
  tech: TechModel;
}

const Tech = (props: TechProps): JSX.Element => {
  const { tech } = props;
  const { _id, name, techNumber } = tech;

  return (
    <Card key={`tech-item-${_id}`}>
      <TitleCard>{name}</TitleCard>
      <Text>{techNumber}</Text>
    </Card>
  );
};

export default Tech;
