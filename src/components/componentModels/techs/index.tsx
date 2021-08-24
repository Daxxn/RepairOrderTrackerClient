import React from 'react';
import { TechObjects } from '../../../models/techModel';
import UserModel from '../../../models/userModel';
import Container from '../material/container';
import Text from '../material/text';
import Tech from './tech';

export interface TechsProps {
  techIds?: string[];
}

const Techs = (props: TechsProps): JSX.Element => {
  const { techIds } = props;
  const techs = UserModel.getObjects('Techs') as TechObjects;

  return (
    <Container>
      {techIds && techIds.length > 0 ? (
        techIds.map(id => <Tech tech={techs[id]} />)
      ) : (
        <>
          {techs ? (
            Object.values(techs).map(tech => <Tech tech={tech} />)
          ) : (
            <Text>No Techs found.</Text>
          )}
        </>
      )}
    </Container>
  );
};

export default Techs;
