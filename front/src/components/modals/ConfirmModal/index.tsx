import React from 'react';
import { Button, Container, Wrapper } from './styles';

interface Props {
  open: boolean;
  title: 'Success' | 'Info' | 'Error' | 'Warn';
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <Container>
      <Wrapper>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          {onCancel && <Button onClick={onCancel}>{cancelText}</Button>}
          {onConfirm && (
            <Button autoFocus onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </div>
      </Wrapper>
    </Container>
  );
}

ConfirmModal.defaultProps = {
  confirmText: '확인',
  cancelText: '취소',
  onConfirm: undefined,
  onCancel: undefined,
};
