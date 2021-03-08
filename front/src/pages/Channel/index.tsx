import React, { useCallback, useEffect, useRef, useState } from 'react';

import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router';

import { useUser } from '@API/user';
import { useWorkspaceChannel } from '@API/workspaceChannel';
import { addWorkSpaceChannelChat, useInfiniteListtWorkspaceChannelChat } from '@API/workspaceChannelChat';
import { useListWorkspaceChannelMember } from '@API/workspaceChannelMember';
import { useWorkSpaceSocket } from '@API/ws';
import ChatBox from '@components/organism/ChatBox';
import ChatList from '@components/organism/ChatList';
import useInput from '@hooks/useInput';
import { IChat } from '@typings/db';
import makeSection from '@utils/makeSection';

import AddChannelMemberModal from './AddChannelMemberModal';
import { Container, Header } from './styles';

const PER_PAGE = 20;
const FIRST_LOAD_CHAT_DATA = 1;
const FORCE_SCROLL_BOTTOM_HEIGHT = 150;
const SCROLL_BOTTOM_EFFECT_TIME = 50;

const Channel = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const [socket] = useWorkSpaceSocket(workspace);
  const { data: myData } = useUser();
  const { data: channelData } = useWorkspaceChannel({ workspace, channel });
  const { data: chatData, mutate: mutateChat, revalidate, setSize } = useInfiniteListtWorkspaceChannelChat(
    {
      workspace,
      channel,
    },
    { perPage: PER_PAGE },
  );
  const { data: channelMembersData } = useListWorkspaceChannelMember({ workspace, channel });

  const [chat, onChangeChat, setChat] = useInput('');
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEndData = isEmpty || (chatData && chatData[chatData.length - 1]?.length < PER_PAGE) || false;
  const scrollbarRef = useRef<Scrollbars>(null);
  const [showAddChannelMemberModal, setShowAddChannelMemberModal] = useState(false);

  const handleChatBoxSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (chat?.trim() && chatData && myData && channelData) {
          await mutateChat((prevChatData) => {
            prevChatData?.[0].unshift({
              id: (chatData[0][0]?.id || 0) + 1,
              content: chat,
              UserId: myData.id,
              User: myData,
              ChannelId: channelData.id,
              Channel: channelData,
              createdAt: new Date(),
            });
            return prevChatData;
          }, false);
          setChat('');
          scrollbarRef.current?.scrollToBottom();
          await addWorkSpaceChannelChat({ content: chat }, { workspace, channel });
          revalidate();
        }
      } catch (error) {
        console.dir('error :>> ', error);
      }
    },
    [chat, chatData, myData, channelData, mutateChat, setChat, workspace, channel, revalidate],
  );

  const onMessage = useCallback(
    async (data: IChat) => {
      try {
        if (data.Channel.name === channel && myData && data.UserId !== myData?.id) {
          await mutateChat((prevChatData) => {
            prevChatData?.[0].unshift(data);
            return prevChatData;
          }, false);
          if (scrollbarRef.current) {
            if (
              scrollbarRef.current.getScrollHeight() <
              scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + FORCE_SCROLL_BOTTOM_HEIGHT
            ) {
              setTimeout(() => {
                scrollbarRef.current?.scrollToBottom();
              }, SCROLL_BOTTOM_EFFECT_TIME);
            }
          }
        }
      } catch (error) {
        console.dir('error :>> ', error);
      }
    },
    [channel, mutateChat, myData],
  );

  useEffect(() => {
    if (chatData?.length === FIRST_LOAD_CHAT_DATA) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  useEffect(() => {
    socket.on('message', onMessage);
    return () => {
      socket.off('message', onMessage);
    };
  }, [socket, onMessage]);

  const handleAddChannel = useCallback(() => {
    setShowAddChannelMemberModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowAddChannelMemberModal(false);
  }, []);

  if (!myData) {
    return null;
  }

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container>
      <Header>
        <span>{`#${channel}`}</span>
        <div className="header-right">
          <span>{channelMembersData?.length}</span>
          <button
            onClick={handleAddChannel}
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            type="button"
          >
            <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
          </button>
        </div>
      </Header>
      <ChatList
        chatSections={chatSections}
        scrollRef={scrollbarRef}
        setSize={setSize}
        isReachingEndData={isReachingEndData}
      />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={handleChatBoxSubmit} />
      <AddChannelMemberModal show={showAddChannelMemberModal} onCloseModal={handleCloseModal} />
    </Container>
  );
};

export default Channel;
