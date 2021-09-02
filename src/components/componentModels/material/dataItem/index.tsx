import React, { useState } from 'react';
import { HandleEditChange, HandleEditComplete } from '../../../../utils/eventHandlers';
import Button from '../button';
import { InputType } from '../types';
import './dataItem.css';

export interface DataItemProps {
  title?: string;
  prop: string;
  value: string | number;
  handleEditComplete: HandleEditComplete;
  handleEditChange: HandleEditChange;
}

const DataItem = (props: DataItemProps): JSX.Element => {
  const { title, prop, value, handleEditComplete, handleEditChange } = props;
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleCompleteEdit = () => {
    setEditMode(false);
    handleEditComplete();
  };

  return (
    <span className="Base-data-item">
      <p>{title ?? prop}</p>
      {editMode ? (
        <div className="Controls-container">
          <input
            className="Base-input"
            onChange={e => handleEditChange(prop, e.target.value)}
            value={value}
          />
          <Button className="Edit-button" onClick={handleCompleteEdit}>
            Done
          </Button>
          <Button className="Edit-button" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="Controls-container">
          <p className="Base-value">{value}</p>
          <Button className="Edit-button" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        </div>
      )}
    </span>
  );
};

export default DataItem;
