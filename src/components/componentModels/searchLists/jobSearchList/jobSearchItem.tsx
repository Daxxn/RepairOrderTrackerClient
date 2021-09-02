import React from 'react';
import JobModel from '../../../../models/jobModel';
import { HandleSelectItem } from '../../../../utils/eventHandlers';
import ResultCard from '../../material/resultCard';
import Selectable from '../../material/selectable';
import Text from '../../material/text';

export interface JobSearchItemProps {
  job: JobModel;
  handleSelectItem: HandleSelectItem;
  isSelected?: boolean;
}

const JobSearchItem = (props: JobSearchItemProps): JSX.Element => {
  const { job, handleSelectItem, isSelected } = props;

  return (
    <ResultCard>
      <Selectable onClick={() => handleSelectItem(job._id)} isSelected={isSelected}>
        <Text>{job.name}</Text>
      </Selectable>
    </ResultCard>
  );
};

export default JobSearchItem;
