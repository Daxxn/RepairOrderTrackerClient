import React, { ReactNode, useState } from 'react';
import Button from '../button';

export interface AddModalProps {
  className?: string;
  children: ReactNode;
}

const AddModal = (props: AddModalProps): JSX.Element => {
  const { children, className } = props;
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="Base-add-modal">
      {isOpen ? (
        <div className={`add-modal${className ? ` ${className}` : ''}`}>
          {children}
          <div className="add-modal-controls-container">
            <Button onClick={() => handleClose()}>New</Button>
            <Button onClick={() => handleClose()}>Cancel</Button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default AddModal;
