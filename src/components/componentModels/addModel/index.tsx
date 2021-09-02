import React, { useState } from 'react';
import { ModelType } from '../../../models/userModel';
import { HandleAddNewModel } from '../../../utils/eventHandlers';
import './addModel.css';

export interface AddModelProps {
  type: ModelType;
  handleAddNewModel: HandleAddNewModel;
  parentId: string;
}

const AddModel = (props: AddModelProps): JSX.Element => {
  const { type, handleAddNewModel, parentId } = props;
  const [isOpen, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  return <div />;
};

export default AddModel;
