import React, { CSSProperties, FC, useCallback } from 'react';
import { CloseModalButton, Container } from '@components/atoms/Menu/styles';

interface Props {
  show: boolean;
  onCloseModal: (e: React.SyntheticEvent) => void;
  style: CSSProperties;
  closeButton?: boolean;
}

const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton }) => {
  const stopPropagation = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <Container onClick={onCloseModal}>
      <div role="presentation" style={style} onClick={stopPropagation}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </Container>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
