/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { ReactNode } from 'react';
import Button from '../button';
import { ModalDirection } from '../types';
import { ReactComponent as CloseIcon } from '../../../../icons/X.svg';
import './modal.css';

export interface ModalProps {
  children?: ReactNode;
  position?: ModalDirection;
  direction?: ModalDirection;
  handleClose: () => void;
}

const Modal = (props: ModalProps): JSX.Element => {
  const { children, position, direction, handleClose } = props;

  return (
    <div
      className={`Base-modal${position ? ` ${position}` : ''}${
        direction ? ` ${direction}` : ''
      }`}
    >
      <Button onClick={handleClose} className="Close-button">
        <CloseIcon width="14" height="14" />
      </Button>
      {children}
    </div>
  );
};

export default Modal;
