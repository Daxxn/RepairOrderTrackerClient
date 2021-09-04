import React, { useState } from 'react';
import TechModel from '../../../models/techModel';
import { HandleAddCompleteModel } from '../../../utils/eventHandlers';
import Button from '../../componentModels/material/button';
import '../createModel.css';

export interface TechCreationProps {
  handleAddCompleteModel: HandleAddCompleteModel;
  handleCancel?: () => void;
}

const TechCreation = (props: TechCreationProps): JSX.Element => {
  const { handleAddCompleteModel, handleCancel } = props;
  const [newTech, setTech] = useState<TechModel>({
    _id: '',
    name: '',
    techNumber: 1234,
    userId: '',
    __v: 0,
  });

  const handlePropChange = (prop: string, value: any) => {
    setTech({
      ...newTech,
      [prop]: value,
    });
  };

  const handleCloseAndSave = () => {
    handleAddCompleteModel('Techs', newTech);
  };

  return (
    <div className="Base-create-model">
      <input
        onChange={e => handlePropChange('name', e.target.value)}
        value={newTech.name}
      />
      <input
        onChange={e => handlePropChange('techNumber', e.target.value)}
        value={newTech.techNumber}
      />
      <Button onClick={handleCloseAndSave}>Create</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );
};

export default TechCreation;
