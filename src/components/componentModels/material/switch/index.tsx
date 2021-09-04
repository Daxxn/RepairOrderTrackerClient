import React, { ChangeEvent } from 'react';

export interface SwitchProps {
  value: boolean;
  handleSetSwitch: (state: boolean) => void;
  title?: string;
}

const Switch = (props: SwitchProps): JSX.Element => {
  const { value, handleSetSwitch, title } = props;

  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'true') {
      handleSetSwitch(true);
      return;
    }
    handleSetSwitch(false);
  };

  return (
    <div>
      {title ? <p>{title}</p> : ''}
      <input type="checkbox" onChange={handleSwitch} value={`${value}`} />
    </div>
  );
};

export default Switch;
