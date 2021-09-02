import React, { useState, useEffect } from 'react';
import Card from '../material/card';
import JobModel from '../../../models/jobModel';
import TechModel from '../../../models/techModel';
import UserModel from '../../../models/userModel';
import Title from '../material/title';
import Text from '../material/text';
import Tech from '../techs/tech';
import DataItem from '../material/dataItem';

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

  const handleEditComplete = () => {
    UserModel.setModel('Jobs', job);
  };

  const handleEditChange = (prop: string, value: string | number) => {
    const tempValue = prop === 'time' ? (value as number) : (value as string);
    const tempJob = {
      ...job,
      [prop]: tempValue,
    };
    console.log('Job Change:', tempJob);
    console.log('Original Job:', job);
    setJob({
      ...job,
      [prop]: tempValue,
    });
  };

  return (
    <>
      {job ? (
        <Card key={componentId}>
          <Title>{job.name}</Title>
          {/* <DataItem
            prop="name"
            value={job.name}
            title="Name"
            handleEditChange={handleEditChange}
            handleEditComplete={handleEditComplete}
          /> */}
          <Card>
            <DataItem
              prop="time"
              value={job.time}
              title="Time"
              handleEditChange={handleEditChange}
              handleEditComplete={handleEditComplete}
            />
            <DataItem
              prop="description"
              value={job.description}
              title="Desc"
              handleEditChange={handleEditChange}
              handleEditComplete={handleEditComplete}
            />
            <Text>{job.time}</Text>
            {/* <Text>{job.description}</Text> */}
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
