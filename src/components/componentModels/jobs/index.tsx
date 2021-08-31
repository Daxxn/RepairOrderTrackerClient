import React from 'react';
import Container from '../material/container';
import Text from '../material/text';
import Job from './job';

export interface JobsProps {
  parentId?: string;
  jobIds: string[];
}

const Jobs = (props: JobsProps): JSX.Element => {
  const { jobIds, parentId } = props;

  return (
    <Container flexDirection="column">
      {jobIds && jobIds.length > 0 ? (
        jobIds.map(id => (
          <Job
            key={`job-${id}-${parentId ? `${parentId}` : ''}`}
            parentId={parentId}
            jobId={id}
          />
        ))
      ) : (
        <Text>No Jobs...</Text>
      )}
    </Container>
  );
};

export default Jobs;
