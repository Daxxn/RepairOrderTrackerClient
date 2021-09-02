import React, { ReactNode } from 'react';
import './searchModal.css';

export interface SearchModalProps {
  children?: ReactNode;
}

const SearchModal = (props: SearchModalProps): JSX.Element => {
  const { children } = props;

  return <div className="Base-search-modal">{children}</div>;
};

export default SearchModal;
