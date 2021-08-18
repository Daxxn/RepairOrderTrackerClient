import React from 'react';
import Card from '../material/card';
import JobModel from '../../../models/jobModel';
import { TechObjects } from '../../../models/techModel';
import UserModel from '../../../models/userModel';
import Title from '../material/title';
import Text from '../material/text';

export interface JobProps {
  job: JobModel;
}

const Job = (props: JobProps): JSX.Element => {
  const { job } = props;
  const techs = UserModel.getObjects('Techs') as TechObjects;
  
  return (
    <Card>
        <Title>{job.name}</Title>
      <Card>
        <Text>{job.time}</Text>
        {job.isRecall ? (
          <Text>recall</Text>
        ) : ''}
        <Card>{techs[job.assignedTech].name}</Card>
      </Card>
    </Card>
  );
};

export default Job;
