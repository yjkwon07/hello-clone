import React, { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, ValidationInput } from '@components/atoms';
import Modal, { Props as IModal } from '@components/atoms/Modal';
import { ConfirmModal } from '@components/modals';
import { addWorkSpace as addWorkSpaceAPI } from '@API/workspace';
import fetcher from '@utils/fetcher';
import { USER_FETCH } from '@utils/swrConstants';
import { IUser } from '@typings/db';

type Props = IModal;

const WORKSPACE_SCHEMA = yup.object().shape({
  workspace: yup.string().trim().required('워크스페이스 이름은 필수 입력입니다.'),
  url: yup.string().trim().url('올바른 url 형식이 아닙니다.').required('워크스페이스 url은 필수 입력입니다.'),
});

type FormData = yup.InferType<typeof WORKSPACE_SCHEMA>;

const AddWorkSpaceModal: FC<Props> = ({ show, onCloseModal }) => {
  const { revalidate } = useSWR<IUser | false>(USER_FETCH, fetcher);

  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  const { register, handleSubmit: checkSubmit, errors } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(WORKSPACE_SCHEMA),
  });

  const handleSubmit = useMemo(
    () =>
      checkSubmit(async (formData) => {
        setAddError('');
        setAddSuccess(false);
        try {
          await addWorkSpaceAPI({ workspace: formData.workspace, url: formData.url });
          revalidate();
          setAddSuccess(true);
          onCloseModal();
        } catch (err) {
          setAddError(err.response?.data);
        }
      }),
    [checkSubmit, onCloseModal, revalidate],
  );

  return (
    <>
      <Modal show={show} onCloseModal={onCloseModal}>
        <form onSubmit={handleSubmit}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <ValidationInput
              inputProps={{ type: 'text', id: 'workspace', name: 'workspace', ref: register }}
              errMessage={errors.workspace?.message}
            />
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <ValidationInput
              inputProps={{ type: 'text', id: 'url', name: 'url', ref: register }}
              errMessage={errors.url?.message}
            />
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>

      <ConfirmModal
        show={addSuccess}
        title="Success"
        description="워크스페이스가 생성되었습니다."
        onCloseModal={() => setAddSuccess(false)}
      />
      <ConfirmModal show={!!addError} title="Error" description={addError} onCloseModal={() => setAddError('')} />
    </>
  );
};

export default AddWorkSpaceModal;
