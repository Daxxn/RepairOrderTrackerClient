import React from 'react';
import { TechObjects } from '../../../models/techModel';
import UserModel from '../../../models/userModel';
import Container from '../material/container';
import Text from '../material/text';
import Tech from './tech';

export interface TechsProps {
  techIds?: string[];
  displayAllTechs?: boolean;
}

const Techs = (props: TechsProps): JSX.Element => {
  const { techIds, displayAllTechs } = props;
  const allTechIds = Object.keys(UserModel.getObjects('Techs') as TechObjects);

  return (
    <Container>
      {techIds && techIds.length > 0 ? (
        techIds.map(id => <Tech key={`main-tech-item-${id}`} techId={id} />)
      ) : (
        <>
          {allTechIds && displayAllTechs ? (
            Object.values(allTechIds).map(id => (
              <Tech key={`tech-item-${id}`} techId={id} />
            ))
          ) : (
            <Text>No Techs found.</Text>
          )}
        </>
      )}
    </Container>
  );
};

export default Techs;
