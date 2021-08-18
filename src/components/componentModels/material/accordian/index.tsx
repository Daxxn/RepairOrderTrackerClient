import React, { MouseEventHandler, ReactNode } from 'react';
import { useState } from 'react';
import Button from '../button';
import Container from '../container';
import { AccordianBtnPosType, FlexDirType, JustifyType } from '../types';
import './accordian.css';

export interface AccordianProps {
  children?: ReactNode;
  handleOpen?: MouseEventHandler;
  flexDirection?: FlexDirType;
  justify?: JustifyType;
  buttonPosition?: AccordianBtnPosType;
}

const Accordian = (props: AccordianProps): JSX.Element => {
  const { children, handleOpen, flexDirection, justify, buttonPosition } = props;
  const [open, setOpen] = useState<boolean>();

  const handleOpenClose = () => {
    setOpen(!open);
  };

  return (
    <div className={`Base-accordian ${buttonPosition ? buttonPosition : 'right'}`}>
      <Button
        className="accordian-button"
        onClick={handleOpen ? handleOpen : handleOpenClose}
      >
        {open ? 'close' : 'open'}
      </Button>
      {open ? (
        <div className="Accordian-reset">
          <Container flexDirection={flexDirection} justify={justify}>
            {children}
          </Container>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Accordian;
