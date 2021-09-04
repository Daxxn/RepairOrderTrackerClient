import React, { ReactNode, useState } from 'react';
import Modal from '.';
import Button from '../button';
import { ModalDirection } from '../types';
import './modal.css';

export interface ModalContainerProps {
  children?: ReactNode;
  position?: ModalDirection;
  direction?: ModalDirection;
}

const ModalContainer = (props: ModalContainerProps): JSX.Element => {
  const { children, position, direction } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="Base-modal-container">
      {open ? (
        <>
          <Modal position={position} direction={direction} handleClose={handleClose}>
            {children}
          </Modal>
        </>
      ) : (
        <Button onClick={() => setOpen(true)}>Modal Test</Button>
      )}
    </div>
  );
};

export default ModalContainer;
