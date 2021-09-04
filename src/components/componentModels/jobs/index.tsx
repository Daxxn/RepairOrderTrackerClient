import React from 'react';
import Container from '../material/container';
import Text from '../material/text';
import Job from './job';

export interface JobsProps {
  parentId?: string;
  jobIds: string[];
  selectedTechId: string | null;
}

const Jobs = (props: JobsProps): JSX.Element => {
  const { jobIds, parentId, selectedTechId } = props;

  return (
    <Container flexDirection="column">
      {jobIds && jobIds.length > 0 ? (
        jobIds.map(id => (
          <Job
            key={`job-${id}-${parentId ? `${parentId}` : ''}`}
            parentId={parentId}
            jobId={id}
            selectedTechId={selectedTechId}
          />
        ))
      ) : (
        <Text>No Jobs...</Text>
      )}
    </Container>
  );
};

export default Jobs;
