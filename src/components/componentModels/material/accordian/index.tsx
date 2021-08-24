import React, { MouseEventHandler, ReactNode, useState } from 'react';
import Button from '../button';
import Container from '../container';
import { AccordianBtnPosType, FlexDirType, JustifyType } from '../types';
import { ReactComponent as Arrow } from '../../../../icons/ExpanderArrow.svg';
import './accordian.css';
import Icon from '../icon';

export interface AccordianProps {
  children?: ReactNode;
  expanderButton?: ReactNode;
  handleOpen?: MouseEventHandler;
  flexDirection?: FlexDirType;
  justify?: JustifyType;
  buttonPosition?: AccordianBtnPosType;
}

const Accordian = (props: AccordianProps): JSX.Element => {
  const { children, expanderButton, handleOpen, flexDirection, justify, buttonPosition } =
    props;
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenClose = () => {
    setOpen(!open);
  };

  return (
    <div className={`Base-accordian ${buttonPosition ?? 'right'}`}>
      <Button className="Accordian-button" onClick={handleOpen ?? handleOpenClose}>
        {/* {open ? 'close' : 'open'} */}
        {expanderButton ?? (
          // <Arrow />
          // <Icon iconName="ExpanderArrow.svg" invert={open} />
          <Icon invert={open}>
            <Arrow className="icon" />
          </Icon>
        )}
      </Button>
      {open ? (
        <div className="Accordian-reset">
          <Container flexDirection={flexDirection} justify={justify}>
            {children ?? <div id="empty-accordian" />}
          </Container>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Accordian;
