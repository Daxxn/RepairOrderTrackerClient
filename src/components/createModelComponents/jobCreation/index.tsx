import React, { useState } from 'react';
import JobModel from '../../../models/jobModel';
import { HandleNewModel } from '../../../utils/eventHandlers';
import '../createModel.css';

export interface JobCreationProps {
  handleNewModel: HandleNewModel;
}

const JobCreation = (props: JobCreationProps): JSX.Element => {
  const { handleNewModel } = props;
  const [newJob, setJob] = useState<JobModel | null>(null);

  return <div></div>;
};

export default JobCreation;
