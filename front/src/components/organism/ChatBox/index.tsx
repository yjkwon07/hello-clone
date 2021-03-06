import React, { useCallback, useEffect, useMemo, useRef, VFC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import autosize from 'autosize';
import cls from 'classnames';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ChatArea, Form, MentionsTextarea, SendButton, Toolbox } from '@components/organism/ChatBox/styles';

interface Props {
  chat?: string;
  placeholder?: string;
  onSubmitForm: (data: FormData) => void;
}

const CHAT_SCHEMA = yup.object({
  chat: yup.string().trim().required(),
});

type FormData = yup.InferType<typeof CHAT_SCHEMA>;

const ChatBox: VFC<Props> = ({ chat, onSubmitForm, placeholder }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { register, handleSubmit: checkSubmit, formState } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { chat },
    resolver: yupResolver(CHAT_SCHEMA),
  });

  useEffect(() => {
    if (textareaRef.current) autosize(textareaRef.current);
  }, []);

  const handleSubmit = useMemo(() => checkSubmit(onSubmitForm), [checkSubmit, onSubmitForm]);

  const handleKeydownChat = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          handleSubmit(e);
        }
      }
    },
    [handleSubmit],
  );

  return (
    <ChatArea>
      <Form onSubmit={handleSubmit}>
        <MentionsTextarea
          id="editor-chat"
          name="chat"
          onKeyPress={handleKeydownChat}
          placeholder={placeholder}
          ref={(e) => {
            register(e);
            textareaRef.current = e;
          }}
        />
        <Toolbox>
          <SendButton
            className={cls(
              'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send',
              {
                'c-texty_input__button--disabled': !formState.isValid,
              },
            )}
            aria-label="Send message"
            type="submit"
            disabled={!formState.isValid}
          >
            <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
