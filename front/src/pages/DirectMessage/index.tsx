import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import gravatar from 'gravatar';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router-dom';

import { useUser } from '@API/user';
import { requestAddWorkSpaceDmsChat, useInfiniteListWorkspaceDmsChat } from '@API/workspaceDmsChat';
import { useWorkspaceMember } from '@API/workspaceMember';
import { useWorkSpaceSocket } from '@API/ws';
import { ChatBox, ChatList } from '@components/organism';
import useInput from '@hooks/useInput';
import { IDM } from '@typings/db';
import makeSection from '@utils/makeSection';

import { Container, Header } from './styles';

const PER_PAGE = 20;
const FIRST_LOAD_CHAT_DATA = 1;
const FORCE_SCROLL_BOTTOM_HEIGHT = 150;
const SCROLL_BOTTOM_EFFECT_TIME = 50;

const DirectMessage = () => {
  const { workspace, id: mberId } = useParams<{ workspace: string; id: string }>();
  const [socket] = useWorkSpaceSocket(workspace);
  const { data: userData } = useWorkspaceMember({ workspace, mberId });
  const { data: myData } = useUser();
  const { data: chatListData, mutate: mutateChat, revalidate, setSize } = useInfiniteListWorkspaceDmsChat(
    {
      workspace,
      mberId,
    },
    { perPage: PER_PAGE },
  );

  const [chat, handleChangeChat, setChat] = useInput('');
  const isEmpty = chatListData?.[0]?.length === 0;
  const isReachingEndData =
    isEmpty || (chatListData && chatListData[chatListData.length - 1]?.length < PER_PAGE) || false;
  const scrollbarRef = useRef<Scrollbars>(null);

  const handleChatBoxSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (chat?.trim() && chatListData && myData && userData) {
          await mutateChat((prevChatListData) => {
            prevChatListData?.[0].unshift({
              id: (prevChatListData[0][0]?.id || 0) + 1,
              content: chat,
              SenderId: myData.id,
              Sender: myData,
              ReceiverId: userData.id,
              Receiver: userData,
              createdAt: new Date(),
            });
            return prevChatListData;
          }, false);
          setChat('');
          scrollbarRef.current?.scrollToBottom();
          await requestAddWorkSpaceDmsChat({ content: chat }, { workspace, mberId });
          await revalidate();
        }
      } catch (error) {
        console.dir('error :>> ', error);
      }
    },
    [chat, chatListData, mberId, mutateChat, myData, revalidate, setChat, userData, workspace],
  );

  const handleMessage = useCallback(
    async (data: IDM) => {
      try {
        if (data.SenderId === Number(mberId) && myData) {
          await mutateChat((prevChatListData) => {
            prevChatListData?.[0].unshift(data);
            return prevChatListData;
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
    [mberId, mutateChat, myData],
  );

  useEffect(() => {
    if (chatListData?.length === FIRST_LOAD_CHAT_DATA) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatListData]);

  useEffect(() => {
    socket.on('dm', handleMessage);
    return () => {
      socket.off('dm', handleMessage);
    };
  }, [socket, handleMessage]);

  const chatSections = useMemo(() => makeSection(chatListData ? chatListData.flat().reverse() : []), [chatListData]);

  if (!userData || !myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList
        chatSections={chatSections}
        scrollRef={scrollbarRef}
        setSize={setSize}
        isReachingEndData={isReachingEndData}
      />
      <ChatBox chat={chat} onChangeChat={handleChangeChat} onSubmitForm={handleChatBoxSubmit} />
    </Container>
  );
};

export default DirectMessage;
