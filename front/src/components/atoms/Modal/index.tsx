import React, { FC, useCallback } from 'react';

import { CloseModalButton, Container } from '@components/atoms/Modal/styles';

export interface Props {
  show: boolean;
  onCloseModal: () => void;
}

const Modal: FC<Props> = ({ show, children, onCloseModal }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <Container onClick={onCloseModal}>
      <div role="presentation" onClick={stopPropagation}>
        <CloseModalButton autoFocus onClick={onCloseModal}>
          &times;
        </CloseModalButton>
        {children}
      </div>
    </Container>
  );
};

export default Modal;
