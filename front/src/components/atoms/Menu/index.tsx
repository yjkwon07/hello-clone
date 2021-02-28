import React, { CSSProperties, FC, useCallback } from 'react';
import { CloseModalButton, Container } from '@components/atoms/Menu/styles';

interface Props {
  show: boolean;
  onClose: (e: React.SyntheticEvent) => void;
  style: CSSProperties;
  closeButton?: boolean;
}

const Menu: FC<Props> = ({ children, style, show, onClose, closeButton }) => {
  const stopPropagation = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <Container onClick={onClose}>
      <div role="presentation" style={style} onClick={stopPropagation}>
        {closeButton && <CloseModalButton onClick={onClose}>&times;</CloseModalButton>}
        {children}
      </div>
    </Container>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
