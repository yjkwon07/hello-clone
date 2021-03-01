import React, { FC, useCallback, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { CollapseButton } from '@components/atoms';
import { useUser } from '@API/user/hooks/useUser';
import { useListworkspaceMember } from '@API/workspaceMember';
import { GET_DM_URL } from '@utils/url';

const DMList: FC = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: userData } = useUser();
  const { data: memberData } = useListworkspaceMember(workspace);

  const [dmCollapse, setDmCollapse] = useState(false);
  const [countList, setCountList] = useState<{ [key: string]: number }>({});
  const [onlineList] = useState<number[]>([]);

  const toggleDmCollapse = useCallback(() => {
    setDmCollapse((prev) => !prev);
  }, []);

  const resetCount = useCallback(
    (id) => () => {
      setCountList((list) => ({ ...list, [id]: 0 }));
    },
    [],
  );

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
                onClick={resetCount(member.id)}
              >
                <i
                  className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence ${
                    isOnline ? 'c-presence--active c-icon--presence-online' : 'c-icon--presence-offline'
                  }`}
                  aria-hidden="true"
                />
                <span className={count > 0 ? 'bold' : undefined}>{member.nickname}</span>
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
