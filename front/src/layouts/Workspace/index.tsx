import React, { useCallback, useState, VFC } from 'react';
import { Link, Route, Switch, Redirect, useParams } from 'react-router-dom';
import loadable from '@loadable/component';
import useSWR from 'swr';
import { Menu } from '@components/atoms';
import AddChannelModal from '@layouts/Workspace/AddChannelModal';
import AddWorkSpaceModal from '@layouts/Workspace/AddWorkSpaceModal';
import Header from '@layouts/Workspace/Header';
import {
  AddButton,
  Channels,
  Chats,
  MenuScroll,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/Workspace/styles';
import { logout as logoutAPI } from '@API/user';
import fetcher from '@utils/fetcher';
import { GET_CHANNEL_FETCH, USER_FETCH } from '@utils/swrConstants';
import { CHANNEL_URL, DM_URL, GET_CHANNEL_URL, LOGIN_URL } from '@utils/url';
import { IChannel, IUser } from '@typings/db';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: VFC = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: userData, mutate } = useSWR<IUser | false>(USER_FETCH, fetcher, { dedupingInterval: 2000 });
  const { data: channelData } = useSWR<IChannel[]>(userData ? GET_CHANNEL_FETCH(workspace) : null, fetcher, {
    dedupingInterval: 2000,
  });

  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);

  const handleAddWorkspace = useCallback(() => {
    setShowAddWorkspaceModal(true);
  }, []);

  const handleWorkspaceModal = useCallback(() => {
    setShowWorkspaceMenu((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logoutAPI();
      mutate(false, false);
    } catch (err) {
      console.dir('err :>> ', err);
    }
  }, [mutate]);

  const onClickAddChannel = useCallback(() => {
    setShowAddChannelModal(true);
  }, []);

  if (!userData) {
    return <Redirect to={LOGIN_URL} />;
  }

  return (
    <div>
      <Header />
      <WorkspaceWrapper>
        <Workspaces>
          {userData.Workspaces?.map((data) => (
            <Link key={data.id} to={GET_CHANNEL_URL('123', '일반')}>
              <WorkspaceButton>{data.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
            </Link>
          ))}
          <AddButton onClick={handleAddWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={handleWorkspaceModal}>Sleact</WorkspaceName>
          <MenuScroll>
            <Menu show={showWorkspaceMenu} onClose={handleWorkspaceModal} style={{ top: 95, left: 80 }}>
              <WorkspaceModal>
                <h2>Sleact</h2>
                <button type="button" onClick={onClickAddChannel}>
                  채널 만들기
                </button>
                <button type="button" onClick={handleLogout}>
                  로그아웃
                </button>
              </WorkspaceModal>
            </Menu>
            {channelData?.map((v) => (
              <div key={v.id}>{v.name}</div>
            ))}
          </MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path={CHANNEL_URL} component={Channel} />
            <Route path={DM_URL} component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>

      <AddWorkSpaceModal show={showAddWorkspaceModal} onCloseModal={() => setShowAddWorkspaceModal(false)} />
      <AddChannelModal show={showAddChannelModal} onCloseModal={() => setShowAddChannelModal(false)} />
    </div>
  );
};

export default Workspace;
