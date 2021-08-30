import React from 'react';
import FlagManager from '../../../utils/FlagManager';
import Text from '../material/text';
import './flag.css';

export interface FlagProps {
  flagNumber?: number;
}

const Flag = (props: FlagProps): JSX.Element => {
  const { flagNumber } = props;

  const flag = flagNumber ? FlagManager.getFlag(flagNumber) : null;

  return (
    <>
      {flag ? <Text className="Base-flag">{`${flag.number} - ${flag.desc}`}</Text> : ''}
    </>
  );
};

export default Flag;
