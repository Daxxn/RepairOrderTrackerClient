import React from 'react';
import {
  HandleDateEditChange,
  HandleDateEditComplete,
} from '../../../../utils/eventHandlers';
import Button from '../button';
import './dateViewer.css';

export interface DateEditorProps {
  date: Date;
  prop: string;
  handleEditChange: HandleDateEditChange;
  handleEditComplete: HandleDateEditComplete;
}

const DateEditor = (props: DateEditorProps): JSX.Element => {
  const { date, prop, handleEditChange, handleEditComplete } = props;

  return (
    <div className="Base-edit-container">
      <input
        type="date"
        onChange={e => handleEditChange(prop, new Date(e.target.value))}
        value={date.getDate()}
      />
      <Button onClick={handleEditComplete}>Done</Button>
    </div>
  );
};

export default DateEditor;
