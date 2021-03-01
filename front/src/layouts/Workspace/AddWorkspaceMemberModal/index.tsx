import React, { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, ValidationInput } from '@components/atoms';
import Modal, { Props as IModal } from '@components/atoms/Modal';
import { ConfirmModal } from '@components/modals';
import { addWorkSpaceMember as addWorkSpaceMemberAPI } from '@API/workspaceMember';
import { useUser } from '@API/user';
import { useListWorkspaceChannel } from '@API/workspaceChannel';

type Props = IModal;

const WORKSPACE_MEMBER_SCHEMA = yup.object().shape({
  email: yup.string().trim().email('올바르지 않은 이메일 양식입니다.').required('이메일은 필수 입력입니다.'),
});

type FormData = yup.InferType<typeof WORKSPACE_MEMBER_SCHEMA>;

const AddWorkspaceMemberModal: FC<Props> = ({ show, onCloseModal }) => {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: userData } = useUser();
  const { revalidate } = useListWorkspaceChannel(!!userData, workspace);

  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  const { register, handleSubmit: checkSubmit, errors } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(WORKSPACE_MEMBER_SCHEMA),
  });

  const handleSubmit = useMemo(
    () =>
      checkSubmit(async (formData) => {
        setAddError('');
        setAddSuccess(false);
        try {
          await addWorkSpaceMemberAPI({ email: formData.email }, { workspace });
          revalidate();
          setAddSuccess(true);
          onCloseModal();
        } catch (err) {
          setAddError(err.response?.data);
        }
      }),
    [checkSubmit, onCloseModal, revalidate, workspace],
  );

  return (
    <>
      <Modal show={show} onCloseModal={onCloseModal}>
        <form onSubmit={handleSubmit}>
          <Label id="email-label">
            <span>이메일</span>
            <ValidationInput
              inputProps={{ type: 'text', id: 'email', name: 'email', ref: register }}
              errMessage={errors.email?.message}
            />
          </Label>
          <Button type="submit">초대하기</Button>
        </form>
      </Modal>

      <ConfirmModal
        show={addSuccess}
        title="Success"
        description="초대 되었습니다."
        onCloseModal={() => setAddSuccess(false)}
      />
      <ConfirmModal show={!!addError} title="Error" description={addError} onCloseModal={() => setAddError('')} />
    </>
  );
};

export default AddWorkspaceMemberModal;
