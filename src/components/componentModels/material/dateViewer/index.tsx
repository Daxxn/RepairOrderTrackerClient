import React from 'react';
import Text from '../text';
import './dateViewer.css';

export interface DateViewerProps {
  date?: Date;
  className?: string;
}

const DateViewer = (props: DateViewerProps): JSX.Element => {
  const { date, className } = props;

  let dateDisplay = '--/--/--';
  if (date) {
    dateDisplay = Date.toString();
    // const day = date.getDay();
    // const month = date.getMonth();
    // const year = date.getFullYear();
    // dateDisplay = `${month}/${day}/${year}`;
  }

  return (
    <div className={`Base-date-viewer-container${className ? ` ${className}` : ''}`}>
      <Text>{dateDisplay}</Text>
    </div>
  );
};

export default DateViewer;
