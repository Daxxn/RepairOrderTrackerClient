import React, { MouseEventHandler, ReactNode, useState } from 'react';
import Button from '../button';
import Container from '../container';
import { AlignType, FlexDirType, JustifyFlexType } from '../types';
import { ReactComponent as Arrow } from '../../../../icons/ExpanderArrow.svg';
import './accordian.css';
import Icon from '../icon';

export interface AccordianProps {
  children?: ReactNode;
  expanderButton?: ReactNode;
  handleOpen?: MouseEventHandler;
  flexDirection?: FlexDirType;
  justify?: JustifyFlexType;
  buttonPosition?: AlignType;
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
      <Button
        className={`Accordian-button${open ? ' open' : ' closed'}`}
        onClick={handleOpen ?? handleOpenClose}
      >
        {expanderButton ?? (
          <Icon invert={open} className={`${open ? 'open' : 'closed'}`}>
            <Arrow className="icon" />
          </Icon>
        )}
      </Button>
      {open ? (
        <div className="Accordian-reset">
          <Container
            className="Accordian-container"
            flexDirection={flexDirection}
            justify={justify}
          >
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
