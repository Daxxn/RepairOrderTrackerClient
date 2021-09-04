import React, { useState } from 'react';
import TechModel from '../../../models/techModel';
import { HandleNewModel } from '../../../utils/eventHandlers';
import '../createModel.css';

export interface TechCreationProps {
  handleNewModel: HandleNewModel;
}

const TechCreation = (props: TechCreationProps): JSX.Element => {
  const { handleNewModel } = props;
  const [newTech, setTech] = useState<TechModel | null>(null);

  return <div></div>;
};

export default TechCreation;
