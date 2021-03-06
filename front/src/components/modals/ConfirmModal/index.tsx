import React, { FC } from 'react';

import Modal, { Props as IModal } from '@components/atoms/Modal';
import { Button, Wrapper } from '@components/modals/ConfirmModal/styles';

interface Props extends IModal {
  title: 'Success' | 'Info' | 'Error' | 'Warn';
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmModal: FC<Props> = ({
  show,
  title,
  description,
  confirmText,
  cancelText,
  onCloseModal,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <Wrapper>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          {onCancel && <Button onClick={onCancel}>{cancelText}</Button>}
          {onConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
        </div>
      </Wrapper>
    </Modal>
  );
};

ConfirmModal.defaultProps = {
  confirmText: '확인',
  cancelText: '취소',
};

export default ConfirmModal;
