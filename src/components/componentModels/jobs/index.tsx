import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { JobObjects } from '../../../models/jobModel';
import UserModel from '../../../models/userModel';
import Job from './job';

export interface JobsProps {
  jobIds: string[];
}

const Jobs = (props: JobsProps): JSX.Element => {
  const { jobIds } = props;
  const jobs = UserModel.getObjects('Jobs') as JobObjects;
  
  return (
    <CardGroup>
    {jobIds && jobIds.length > 0 ? jobIds.map(id => (
      <Job job={jobs[id]} />
    )): (
      <Card.Text>No Jobs...</Card.Text>
    )}
    </CardGroup>
  );
};

export default Jobs;
