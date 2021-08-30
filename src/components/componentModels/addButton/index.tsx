import React from 'react';
import { ModelType } from '../../../models/userModel';
import Button from '../material/button';
import modelToString from '../../../utils/typeDisplay';
import { ReactComponent as AddIcon } from '../../../icons/NewItem.svg';
import './addButton.css';

export interface AddButtonProps {
  type: ModelType;
  addModelHandler: () => void;
}

const AddButton = (props: AddButtonProps): JSX.Element => {
  const { type, addModelHandler } = props;

  return (
    <Button className="Base-add-button" onClick={addModelHandler}>
      {AddIcon}
      {`Add ${modelToString(type)}`}
    </Button>
  );
};

export default AddButton;
