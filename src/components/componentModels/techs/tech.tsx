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
  const { _id, name, techId, activeJobs } = tech;

  return (
    <Card>
      <TitleCard>{name}</TitleCard>
      <Text>{techId}</Text>
      <Jobs jobIds={activeJobs} parentId={_id} />
    </Card>
  );
};

export default Tech;
