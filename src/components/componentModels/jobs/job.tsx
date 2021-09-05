import React, { useState, useEffect } from 'react';
import Card from '../material/card';
import JobModel from '../../../models/jobModel';
import TechModel from '../../../models/techModel';
import UserModel from '../../../models/userModel';
import Title from '../material/title';
import Text from '../material/text';
import DataItem from '../material/dataItem';
import Button from '../material/button';
import CardHeader from '../material/card/cardHeader';
import TitleCard from '../material/titleCard';

export interface JobProps {
  parentId?: string;
  jobId: string;
  selectedTechId: string | null;
}

const Job = (props: JobProps): JSX.Element => {
  const { jobId, parentId, selectedTechId } = props;
  const jobInput = UserModel.getModel('Jobs', jobId) as JobModel;
  let tech = null;
  const [job, setJob] = useState<JobModel>(jobInput);
  if (job.assignedTech) {
    tech = UserModel.getModel('Techs', job.assignedTech) as TechModel;
  }
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

  const handleAssignTech = () => {
    UserModel.setModel('Jobs', {
      ...job,
      assignedTech: selectedTechId,
    });
  };

  return (
    <>
      {job ? (
        <Card key={componentId}>
          <TitleCard size="small" align="left">
            {job.name}
          </TitleCard>
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
          {/* <Text>{job.description}</Text> */}
          {job.isRecall ? (
            <Text size="small" align="left">
              recall
            </Text>
          ) : (
            ''
          )}
          <div>
            {tech ? (
              <Card>
                <Text size="small" align="left">
                  Assigned Tech : {tech.name}
                </Text>
              </Card>
            ) : (
              ''
            )}
            <Button onClick={handleAssignTech}>Assign Selected Tech</Button>
          </div>
        </Card>
      ) : (
        ''
      )}
    </>
  );
};

export default Job;
