import React, { useCallback, useEffect, useMemo, useRef, VFC } from 'react';

import autosize from 'autosize';
import cls from 'classnames';
import gravatar from 'gravatar';
import { Mention, SuggestionDataItem } from 'react-mentions';
import { useParams } from 'react-router-dom';

import { useListworkspaceMember } from '@API/workspaceMember';

import { ChatArea, EachMention, Form, MentionsTextarea, SendButton, Toolbox } from './styles';

interface Props {
  chat: string;
  placeholder?: string;
  onChangeChat: (e: any) => void;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatBox: VFC<Props> = ({ chat, placeholder, onChangeChat, onSubmitForm }) => {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: memberData } = useListworkspaceMember({ workspace });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) autosize(textareaRef.current);
  }, []);

  const handleKeydownChat = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm],
  );

  const mentionData = useMemo(() => {
    return memberData?.map((v) => ({ id: v.id, display: v.nickname })) || [];
  }, [memberData]);

  const renderSuggestion = useCallback(
    (
      _suggestion: SuggestionDataItem,
      _search: string,
      highlightedDisplay: React.ReactNode,
      index: number,
      focus: boolean,
    ): React.ReactNode | null => {
      if (!memberData) return null;
      return (
        <EachMention focus={focus}>
          <img
            src={gravatar.url(memberData[index].email, { s: '20px', d: 'retro' })}
            alt={memberData[index].nickname}
          />
          <span>{highlightedDisplay}</span>
        </EachMention>
      );
    },
    [memberData],
  );

  return (
    <ChatArea>
      <Form onSubmit={onSubmitForm}>
        <MentionsTextarea
          id="editor-chat"
          value={chat}
          onChange={onChangeChat}
          onKeyPress={handleKeydownChat}
          placeholder={placeholder}
          inputRef={textareaRef}
          allowSuggestionsAboveCursor
        >
          <Mention appendSpaceOnAdd trigger="@" data={mentionData} renderSuggestion={renderSuggestion} />
        </MentionsTextarea>
        <Toolbox>
          <SendButton
            className={cls(
              'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send',
              {
                'c-texty_input__button--disabled': !chat.trim(),
              },
            )}
            aria-label="Send message"
            type="submit"
            disabled={!chat.trim()}
          >
            <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
