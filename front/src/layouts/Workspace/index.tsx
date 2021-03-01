import React, { useCallback, useState, VFC } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { Menu } from '@components/atoms';
import Header from '@layouts/Workspace/Header';
import ChannelList from '@layouts/Workspace/ChannelList';
import DMList from '@layouts/Workspace/DMList';
import AddChannelModal from '@layouts/Workspace/AddChannelModal';
import AddWorkSpaceModal from '@layouts/Workspace/AddWorkSpaceModal';
import AddWorkspaceMemberModal from '@layouts/Workspace/AddWorkspaceMemberModal';
import {
  AddButton,
  Channels,
  Chats,
  ChannelScroll,
  WorkspaceButton,
  WorkspaceMenu,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/Workspace/styles';
import { logout as logoutAPI, useUser } from '@API/user';
import { CHANNEL_URL, DM_URL, GET_CHANNEL_URL, LOGIN_URL } from '@utils/url';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: VFC = () => {
  const { data: userData, mutate } = useUser();

  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);

  const [showAddWorkspaceMemberModal, setShowAddWorkspaceMemberModal] = useState(false);
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);

  const handleToggleWorkspaceMenu = useCallback(() => {
    setShowWorkspaceMenu((prev) => !prev);
  }, []);

  const handleAddWorkspace = useCallback(() => {
    setShowAddWorkspaceModal(true);
  }, []);

  const handleAddWorkspaceMember = useCallback(() => {
    setShowAddWorkspaceMemberModal(true);
  }, []);

  const handleAddChannel = useCallback(() => {
    setShowAddChannelModal(true);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logoutAPI();
      mutate(false, false);
    } catch (err) {
      console.dir('err :>> ', err);
    }
  }, [mutate]);

  if (!userData) return <Redirect to={LOGIN_URL} />;

  return (
    <div>
      <Header />
      <WorkspaceWrapper>
        <Workspaces>
          {userData.Workspaces?.map((data) => (
            <Link key={data.id} to={GET_CHANNEL_URL(data.name)}>
              <WorkspaceButton>{data.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
            </Link>
          ))}
          <AddButton onClick={handleAddWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={handleToggleWorkspaceMenu}>urSleact</WorkspaceName>
          <Menu show={showWorkspaceMenu} onClose={handleToggleWorkspaceMenu} style={{ top: 95, left: 80 }}>
            <WorkspaceMenu>
              <h2>urSleact</h2>
              <button type="button" onClick={handleAddWorkspaceMember}>
                사용자 초대
              </button>
              <button type="button" onClick={handleAddChannel}>
                채널 만들기
              </button>
              <button type="button" onClick={handleLogout}>
                로그아웃
              </button>
            </WorkspaceMenu>
          </Menu>
          <ChannelScroll>
            <ChannelList />
            <DMList />
          </ChannelScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path={CHANNEL_URL} component={Channel} />
            <Route path={DM_URL} component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>

      <AddWorkSpaceModal show={showAddWorkspaceModal} onCloseModal={() => setShowAddWorkspaceModal(false)} />
      <AddWorkspaceMemberModal
        show={showAddWorkspaceMemberModal}
        onCloseModal={() => setShowAddWorkspaceMemberModal(false)}
      />
      <AddChannelModal show={showAddChannelModal} onCloseModal={() => setShowAddChannelModal(false)} />
    </div>
  );
};

export default Workspace;
