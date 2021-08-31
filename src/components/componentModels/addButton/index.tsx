import React from 'react';
import Button from '../material/button';
import { ReactComponent as AddIcon } from '../../../icons/NewItem.svg';
import './addButton.css';

export interface AddButtonProps {
  addModelHandler: () => void;
}

const AddButton = (props: AddButtonProps): JSX.Element => {
  const { addModelHandler } = props;

  return (
    <div className="Add-button-container">
      <Button className="Base-add-button" onClick={addModelHandler}>
        <AddIcon />
      </Button>
    </div>
  );
};

export default AddButton;
