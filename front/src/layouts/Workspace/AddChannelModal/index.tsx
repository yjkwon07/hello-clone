import React, { useMemo, useState, VFC } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, ValidationInput } from '@components/atoms';
import Modal, { Props as IModal } from '@components/atoms/Modal';
import { ConfirmModal } from '@components/modals';
import { addChannel as addChannelAPI } from '@API/channel';
import fetcher from '@utils/fetcher';
import { GET_CHANNEL_FETCH, USER_FETCH } from '@utils/swrConstants';
import { IChannel, IUser } from '@typings/db';

type Props = IModal;

const CHANNEL_SCHEMA = yup.object().shape({
  channel: yup.string().trim().required('채널 이름은 필수 입력입니다.'),
});

type FormData = yup.InferType<typeof CHANNEL_SCHEMA>;

const AddChannelModal: VFC<Props> = ({ show, onCloseModal }) => {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: userData } = useSWR<IUser | false>(USER_FETCH, fetcher);
  const { data: channelData, mutate } = useSWR<IChannel[]>(userData ? GET_CHANNEL_FETCH(workspace) : null, fetcher);

  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  const { register, handleSubmit: checkSubmit, errors } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(CHANNEL_SCHEMA),
  });

  const onCreateChannel = useMemo(
    () =>
      checkSubmit(async (formData) => {
        setAddError('');
        setAddSuccess(false);
        try {
          const { data } = await addChannelAPI({ name: formData.channel }, { workspace });
          const listData = channelData?.length ? channelData.concat(data) : data;
          mutate(listData, false);
          setAddSuccess(true);
          onCloseModal();
        } catch (err) {
          setAddError(err.response?.data);
        }
      }),
    [channelData, checkSubmit, mutate, onCloseModal, workspace],
  );

  return (
    <>
      <Modal show={show} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateChannel}>
          <Label id="channel-label">
            <span>채널 이름</span>
            <ValidationInput
              inputProps={{ type: 'text', id: 'channel', name: 'channel', ref: register }}
              errMessage={errors.channel?.message}
            />
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>

      <ConfirmModal
        show={addSuccess}
        title="Success"
        description="채널이 생성되었습니다."
        onCloseModal={() => setAddSuccess(false)}
      />
      <ConfirmModal show={!!addError} title="Error" description={addError} onCloseModal={() => setAddError('')} />
    </>
  );
};

export default AddChannelModal;
