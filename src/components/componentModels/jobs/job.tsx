import React from 'react';
import Card from '../material/card';
import JobModel from '../../../models/jobModel';
import TechModel from '../../../models/techModel';
import UserModel from '../../../models/userModel';
import Title from '../material/title';
import Text from '../material/text';
import Tech from '../techs/tech';

export interface JobProps {
  parentId?: string;
  job: JobModel;
}

const assignedTechFab = (jobId: string, techId: string | null) => {
  if (!techId) {
    return '';
  }
  const tech = UserModel.getModel('Techs', techId) as TechModel;
  if (tech) {
    return (
      <Card>
        <Tech tech={tech} key={`assigned-tech-${jobId}`} />
      </Card>
    );
  }
  return '';
};

const Job = (props: JobProps): JSX.Element => {
  const { job, parentId } = props;
  // const { _id, assignedTech, name, time, isRecall, description } = job;
  const componentId = `job-item-${parentId ?? ''}`;

  return (
    <>
      {job ? (
        <Card key={componentId}>
          <Title>{job.name}</Title>
          <Card>
            <Text>{job.time}</Text>
            <Text>{job.description}</Text>
            {job.isRecall ? <Text>recall</Text> : ''}
            {assignedTechFab(job._id, job.assignedTech)}
          </Card>
        </Card>
      ) : (
        ''
      )}
    </>
  );
};

export default Job;
