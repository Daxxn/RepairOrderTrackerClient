import React from 'react';
import { Card } from 'react-bootstrap';
import JobModel from '../../../models/jobModel';
import { TechObjects } from '../../../models/techModel';
import UserModel from '../../../models/userModel';

export interface JobProps {
  job: JobModel;
}

const Job = (props: JobProps): JSX.Element => {
  const { job } = props;
  const techs = UserModel.getObjects('Techs') as TechObjects;
  
  return (
    <Card>
      <Card.Header>
        <Card.Title>{job.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{job.time}</Card.Text>
        {job.isRecall ? (
          <Card.Text>recall</Card.Text>
        ) : ''}
        <Card.Text>{techs[job.assignedTech].name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Job;
