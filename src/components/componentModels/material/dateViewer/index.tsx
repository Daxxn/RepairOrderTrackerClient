import React from 'react';
import Text from '../text';
import './dateViewer.css';

export interface DateViewerProps {
  date?: string;
  className?: string;
}

const DateViewer = (props: DateViewerProps): JSX.Element => {
  const { date, className } = props;

  let dateDisplay = '--/--/--';
  if (date) {
    const testDate = new Date(date);
    dateDisplay = Date.toString();
    const day = testDate.getDay();
    const month = testDate.getMonth();
    const year = testDate.getFullYear();
    dateDisplay = `${month}/${day}/${year}`;
  }

  return (
    <div className={`Base-date-viewer-container${className ? ` ${className}` : ''}`}>
      <Text>{dateDisplay}</Text>
    </div>
  );
};

export default DateViewer;
