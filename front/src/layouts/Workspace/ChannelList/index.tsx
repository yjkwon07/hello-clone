import React, { FC, useCallback, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { CollapseButton } from '@components/atoms';
import { useListWorkspaceChannel } from '@API/workspaceChannel/hooks/useWorkspaceChannel';
import { GET_CHANNEL_URL } from '@utils/url';

const ChannelList: FC = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: channelData } = useListWorkspaceChannel(workspace);

  const [channelCollapse, setChannelCollapse] = useState(false);
  const [countList, setCountList] = useState<{ [key: string]: number }>({});

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
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
                <span className={count > 0 ? 'bold' : undefined}>{`# ${channel.name}`}</span>
                {count > 0 && <span className="count">{count}</span>}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default ChannelList;
