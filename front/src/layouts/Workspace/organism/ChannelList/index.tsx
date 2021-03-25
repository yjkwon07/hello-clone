import React, { FC, useCallback, useEffect, useState } from 'react';

import cls from 'classnames';
import { NavLink, useParams } from 'react-router-dom';

import { useUser } from '@API/user';
import { useListWorkspaceChannel } from '@API/workspaceChannel';
import { useWorkSpaceSocket, WORKSPACE_WS } from '@API/ws';
import { CollapseButton } from '@components/atoms';
import { IChat } from '@typings/db';
import { GET_CHANNEL_URL } from '@utils/url';

const ChannelList: FC = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const [socket] = useWorkSpaceSocket(workspace);
  const { data: userData } = useUser();
  const { data: channelData } = useListWorkspaceChannel({ workspace });

  const [channelCollapse, setChannelCollapse] = useState(false);
  const [countList, setCountList] = useState<{ [key: string]: number }>({});

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  const resetCount = useCallback((id) => {
    return () => {
      setCountList((list) => ({ ...list, [id]: 0 }));
    };
  }, []);

  useEffect(() => {
    setCountList({});
  }, [workspace]);

  useEffect(() => {
    socket.on(WORKSPACE_WS, (data: IChat) => {
      const mentions: string[] | null = data.content.match(/@\[(.+?)]\((\d)\)/g);
      if (mentions?.find((v) => userData && v.match(/@\[(.+?)]\((\d)\)/)?.[2] === userData?.id.toString())) {
        setCountList((list) => {
          return {
            ...list,
            [`c-${data.ChannelId}`]: (list[`c-${data.ChannelId}`] || 0) + 1,
          };
        });
      }
    });
    return () => {
      socket.off(WORKSPACE_WS);
    };
  }, [socket, userData]);

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Channels</span>
      </h2>
      <div>
        {!channelCollapse &&
          channelData?.map((channel) => {
            const count = countList[`c-${channel.id}`];
            return (
              <NavLink
                key={channel.name}
                activeClassName="selected"
                to={GET_CHANNEL_URL(workspace, channel.name)}
                onClick={resetCount(`c-${channel.id}`)}
              >
                <span className={cls({ bold: count })}>{`# ${channel.name}`}</span>
                {!!count && <span className="count">{count}</span>}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default ChannelList;
