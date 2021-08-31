import React, { useState, useEffect } from 'react';
import Card from '../material/card';
import JobModel from '../../../models/jobModel';
import TechModel from '../../../models/techModel';
import UserModel from '../../../models/userModel';
import Title from '../material/title';
import Text from '../material/text';
import Tech from '../techs/tech';

export interface JobProps {
  parentId?: string;
  jobId: string;
}

const assignedTechFab = (jobId: string, techId: string | null) => {
  if (!techId) {
    return '';
  }
  const tech = UserModel.getModel('Techs', techId) as TechModel;
  if (tech) {
    return (
      <Card>
        <Tech techId={techId} key={`assigned-tech-${jobId}`} />
      </Card>
    );
  }
  return '';
};

const Job = (props: JobProps): JSX.Element => {
  const { jobId, parentId } = props;
  console.log('Job render:', jobId);
  const jobInput = UserModel.getModel('Jobs', jobId) as JobModel;
  const [job, setJob] = useState<JobModel>(jobInput);
  const componentId = `job-item-${parentId ?? ''}`;

  useEffect(() => {
    UserModel.appendModelObserver(componentId, 'Jobs', updatedJob => {
      setJob(updatedJob as JobModel);
    });
    return () => {
      UserModel.removeModelObservers(componentId, 'Jobs');
    };
  }, []);

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
