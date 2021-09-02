import React, { useState } from 'react';
import { JobObjects } from '../../../../models/jobModel';
import UserModel from '../../../../models/userModel';
import JobSearchItem from './jobSearchItem';
import Text from '../../material/text';
import '../searchList.css';
import Accordian from '../../material/accordian';
import Button from '../../material/button';
import { HandleConfirm } from '../../../../utils/eventHandlers';

export interface JobSearchListProps {
  jobIds: string[];
  parentId: string;
  handleConfirm: HandleConfirm;
}

const JobSearchList = (props: JobSearchListProps): JSX.Element => {
  const { jobIds, parentId, handleConfirm } = props;
  const allJobs = UserModel.getObjects('Jobs') as JobObjects;
  const tempJobs: JobObjects = {};
  jobIds.forEach(id => {
    tempJobs[id] = allJobs[id];
  });
  const [selectedJobs, setSelectedJobs] = useState<JobObjects>(tempJobs);

  const handleSelectedJob = (itemId: string) => {
    if (selectedJobs[itemId]) {
      const newSelectedJobs = { ...selectedJobs };
      delete newSelectedJobs[itemId];
      console.log('Old:', selectedJobs);
      console.log('New:', newSelectedJobs);
      setSelectedJobs(newSelectedJobs);
    } else {
      setSelectedJobs({
        ...selectedJobs,
        [itemId]: allJobs[itemId],
      });
    }
  };

  return (
    <div className="Base-search-list">
      <Accordian buttonPosition="center" flexDirection="column">
        <Text>Add Jobs:</Text>
        {allJobs ? (
          Object.values(allJobs).map(job => (
            <JobSearchItem
              key={`search-item-job-${job._id}`}
              job={job}
              isSelected={!!selectedJobs[job._id]}
              handleSelectItem={handleSelectedJob}
            />
          ))
        ) : (
          <Text>No Jobs...</Text>
        )}
        <Button
          onClick={() => {
            console.log('Done!!');
            handleConfirm(selectedJobs ? Object.keys(selectedJobs) : []);
          }}
        >
          Done
        </Button>
      </Accordian>
    </div>
  );
};

export default JobSearchList;
