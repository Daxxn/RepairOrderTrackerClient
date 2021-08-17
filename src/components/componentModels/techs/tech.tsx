import React from 'react';
import { Card } from 'react-bootstrap';
import TechModel from '../../../models/techModel';

export interface TechProps {
  tech: TechModel;
}

const Tech = (props: TechProps): JSX.Element => {
  const { tech } = props;
  
  return (
    <Card>
      <Card.Header>
        <Card.Title>{tech.name}</Card.Title>
      </Card.Header>
    </Card>
  );
};

export default Tech;
