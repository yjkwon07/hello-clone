import React, { useCallback, useEffect, useState, VFC } from 'react';

import loadable from '@loadable/component';
import { Link, Route, Switch, Redirect, useParams } from 'react-router-dom';

import { requestLogout, useUser } from '@API/user';
import { useListWorkspaceChannel } from '@API/workspaceChannel';
import { LOGIN_WS, useWorkSpaceSocket } from '@API/ws';
import { Menu } from '@components/atoms';
import AddChannelModal from '@layouts/Workspace/modals/AddChannelModal';
import AddWorkspaceMemberModal from '@layouts/Workspace/modals/AddWorkspaceMemberModal';
import AddWorkSpaceModal from '@layouts/Workspace/modals/AddWorkSpaceModal';
import ChannelList from '@layouts/Workspace/organism/ChannelList';
import DMList from '@layouts/Workspace/organism/DMList';
import { CHANNEL_URL, DM_URL, GET_CHANNEL_URL, LOGIN_URL } from '@utils/url';

import Header from './organism/Header';
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
} from './styles';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: VFC = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const [socket, disconnect] = useWorkSpaceSocket(workspace);
  const { data: userData, mutate } = useUser();
  const { data: channelData } = useListWorkspaceChannel({ workspace });

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

  const handleCancleAddWorkspace = useCallback(() => {
    setShowAddWorkspaceModal(false);
  }, []);

  const handleAddWorkspaceMember = useCallback(() => {
    setShowAddWorkspaceMemberModal(true);
  }, []);

  const handleCancleAddWorkspaceMember = useCallback(() => {
    setShowAddWorkspaceMemberModal(false);
  }, []);

  const handleAddChannel = useCallback(() => {
    setShowAddChannelModal(true);
  }, []);

  const handleCancleAddChannel = useCallback(() => {
    setShowAddChannelModal(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await requestLogout();
      mutate(false, false);
    } catch (err) {
      console.dir('err :>> ', err);
    }
  }, [mutate]);

  useEffect(() => {
    if (channelData && userData && socket) {
      socket.emit(LOGIN_WS, { id: userData.id, channels: channelData.map((v) => v.id) });
    }
  }, [socket, channelData, userData]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [workspace, disconnect]);

  if (!userData) {
    return <Redirect to={LOGIN_URL} />;
  }

  return (
    <>
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
          <WorkspaceName onClick={handleToggleWorkspaceMenu}>urTalk</WorkspaceName>
          <Menu show={showWorkspaceMenu} onClose={handleToggleWorkspaceMenu} style={{ top: 95, left: 80 }}>
            <WorkspaceMenu>
              <h2>urTalk</h2>
              <button type="button" onClick={handleAddWorkspaceMember}>
                워크스페이스 사용자 초대
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

      <AddWorkSpaceModal show={showAddWorkspaceModal} onCloseModal={handleCancleAddWorkspace} />
      <AddWorkspaceMemberModal show={showAddWorkspaceMemberModal} onCloseModal={handleCancleAddWorkspaceMember} />
      <AddChannelModal show={showAddChannelModal} onCloseModal={handleCancleAddChannel} />
    </>
  );
};

export default Workspace;
