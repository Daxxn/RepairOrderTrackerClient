import React, { useState } from 'react';
import JobModel from '../../../models/jobModel';
import { HandleAddCompleteModel } from '../../../utils/eventHandlers';
import Button from '../../componentModels/material/button';
import '../createModel.css';

export interface JobCreationProps {
  handleAddCompleteModel: HandleAddCompleteModel;
  handleCancel: () => void;
}

const JobCreation = (props: JobCreationProps): JSX.Element => {
  const { handleAddCompleteModel, handleCancel } = props;
  const [newJob, setJob] = useState<JobModel>(new JobModel());

  const handleEditChange = (prop: string, value: any) => {
    // if (newJob) {
    //   setJob({
    //     ...newJob,
    //     [prop]: value,
    //   })
    // } else {
    const createdJob = new JobModel();
    setJob({
      ...createdJob,
      [prop]: value,
    });
    // }
  };

  return (
    <div className="Base-create-model">
      <input
        onChange={e => handleEditChange('name', e.target.value)}
        value={newJob.name}
      />
      <input
        onChange={e => handleEditChange('description', e.target.value)}
        value={newJob.description}
      />
      <input
        onChange={e => handleEditChange('time', e.target.value)}
        value={newJob.time}
      />
      <Button onClick={() => handleAddCompleteModel('Jobs', newJob)}>Create</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );
};

export default JobCreation;
