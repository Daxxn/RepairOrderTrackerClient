import React, { useState, ChangeEvent } from 'react';
import JobModel, { JobObjects } from '../../../models/jobModel';
import UserModel from '../../../models/userModel';
import AddModal from '../material/addModal';
import Jobs from '../jobs';
import { HandleNewModel } from '../../../utils/eventHandlers';

export interface AddJobProps {
  parentId: string;
  handleNewModel: HandleNewModel;
}

const AddJob = (props: AddJobProps): JSX.Element => {
  const { parentId, handleNewModel } = props;
  const [name, setName] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<JobModel | null>(null);
  const allJobs = UserModel.getObjects('Jobs') as JobObjects;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const searchJobs = () => {
    const foundJobs = Object.values(allJobs).filter(job => job.name === name);
    if (foundJobs.length > 0) {
      setSelectedJob(foundJobs[0]);
    }
  };

  return (
    <AddModal>
      <input type="text" onChange={handleInput} value={name} />
    </AddModal>
  );
};

export default AddJob;
