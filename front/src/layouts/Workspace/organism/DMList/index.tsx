import React, { FC, useCallback, useEffect, useState } from 'react';

import cls from 'classnames';
import { NavLink, useParams } from 'react-router-dom';

import { useUser } from '@API/user/hooks/useUser';
import { useListworkspaceMember } from '@API/workspaceMember';
import { ONLINE_LIST_WS, DM_WS, useWorkSpaceSocket } from '@API/ws';
import { CollapseButton } from '@components/atoms';
import { IDM } from '@typings/db';
import { GET_DM_URL } from '@utils/url';

const DMList: FC = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const [socket] = useWorkSpaceSocket(workspace);
  const { data: userData } = useUser();
  const { data: memberData } = useListworkspaceMember({ workspace });

  const [dmCollapse, setDmCollapse] = useState(false);
  const [countList, setCountList] = useState<{ [key: string]: number }>({});
  const [onlineList, setOnlineList] = useState<number[]>([]);

  const toggleDmCollapse = useCallback(() => {
    setDmCollapse((prev) => !prev);
  }, []);

  const handleResetCount = useCallback(
    (id) => () => {
      setCountList((list) => ({ ...list, [id]: 0 }));
    },
    [],
  );

  useEffect(() => {
    setOnlineList([]);
    setCountList({});
  }, [workspace]);

  useEffect(() => {
    socket.on(ONLINE_LIST_WS, (data: number[]) => {
      setOnlineList(data);
    });
    socket.on(DM_WS, (data: IDM) => {
      setCountList((list) => ({
        ...list,
        [data.SenderId]: list[data.SenderId] ? list[data.SenderId] + 1 : 1,
      }));
    });

    return () => {
      socket.off(ONLINE_LIST_WS);
      socket.off(DM_WS);
    };
  }, [socket]);

  return (
    <>
      <h2>
        <CollapseButton collapse={dmCollapse} onClick={toggleDmCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Direct Messages</span>
      </h2>
      <div>
        {!dmCollapse &&
          memberData?.map((member) => {
            const isOnline = onlineList.includes(member.id);
            const count = countList[member.id] || 0;
            return (
              <NavLink
                key={member.id}
                activeClassName="selected"
                to={GET_DM_URL(workspace, member.id)}
                onClick={handleResetCount(member.id)}
              >
                <i
                  className={cls(
                    'c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence',
                    {
                      'c-presence--active c-icon--presence-online': isOnline,
                      'c-icon--presence-offline': !isOnline,
                    },
                  )}
                  aria-hidden="true"
                />
                <span className={cls({ bold: count })}>{member.nickname}</span>
                {userData && member.id === userData.id && <span> (나)</span>}
                {count > 0 && <span className="count">{count}</span>}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default DMList;
