import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { TechObjects } from '../../../models/techModel';
import UserModel from '../../../models/userModel';
import Tech from './tech';

export interface TechsProps {
  techIds: string[];
}

const Techs = (props: TechsProps): JSX.Element => {
  const { techIds } = props;
  const techs = UserModel.getObjects('Techs') as TechObjects;

  return (
    <CardGroup>
      {techIds && techIds.length > 0 ? techIds.map(id => (
        <Tech tech={techs[id]} />
      )): (
        <Card.Text>No Techs...</Card.Text>
      )}
    </CardGroup>
  );
};

export default Techs;
