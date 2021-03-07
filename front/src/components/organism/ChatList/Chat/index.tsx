import React, { VFC, memo, useMemo } from 'react';

import dayjs from 'dayjs';
import gravatar from 'gravatar';
import { Link, useParams } from 'react-router-dom';
import regexifyString from 'regexify-string';

import { IChat, IDM } from '@typings/db';
import { GET_DM_URL } from '@utils/url';

import { ChatWrapper } from './styles';

interface Props {
  data: IDM | IChat;
}

const Chat: VFC<Props> = ({ data }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const user = 'Sender' in data ? data.Sender : data.User;

  const result = useMemo(
    () =>
      regexifyString({
        input: data.content,
        pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
        decorator(match, index) {
          const arr: string[] | null = match.match(/@\[(.+?)]\((\d+?)\)/);
          if (arr) {
            return (
              <Link key={match + index} to={GET_DM_URL(workspace, Number(arr[2]))}>
                {`@${arr[1]}`}
              </Link>
            );
          }
          return <br key={index} />;
        },
      }),
    [data.content, workspace],
  );

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
};

export default memo(Chat);
