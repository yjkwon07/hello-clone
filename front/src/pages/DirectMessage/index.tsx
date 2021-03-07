import React, { useCallback, useEffect, useRef } from 'react';

import gravatar from 'gravatar';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router-dom';

import { useUser } from '@API/user';
import { addWorkSpaceDms, useInfiniteListWorkspaceDms } from '@API/workspaceDms';
import { useWorkspaceMember } from '@API/workspaceMember';
import { useWorkSpaceSocket } from '@API/ws';
import { ChatBox } from '@components/organism';
import ChatList from '@components/organism/ChatList';
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
  const { data: chatData, mutate: mutateChat, revalidate, setSize } = useInfiniteListWorkspaceDms(
    {
      workspace,
      mberId,
    },
    { perPage: PER_PAGE },
  );

  const [chat, onChangeChat, setChat] = useInput('');
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEndData = isEmpty || (chatData && chatData[chatData.length - 1]?.length < PER_PAGE) || false;
  const scrollbarRef = useRef<Scrollbars>(null);

  const handleChatBoxSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (chat?.trim() && chatData && myData && userData) {
          await mutateChat((prevChatData) => {
            prevChatData?.[0].unshift({
              id: (chatData[0][0]?.id || 0) + 1,
              content: chat,
              SenderId: myData.id,
              Sender: myData,
              ReceiverId: userData.id,
              Receiver: userData,
              createdAt: new Date(),
            });
            return prevChatData;
          }, false);
          setChat('');
          scrollbarRef.current?.scrollToBottom();
          await addWorkSpaceDms({ content: chat }, { workspace, mberId });
          revalidate();
        }
      } catch (error) {
        console.dir('error :>> ', error);
      }
    },
    [chat, chatData, mberId, mutateChat, myData, revalidate, setChat, userData, workspace],
  );

  const handleMessage = useCallback(
    async (data: IDM) => {
      try {
        if (data.SenderId === Number(mberId) && myData && myData.id !== Number(mberId)) {
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
    [mberId, mutateChat, myData],
  );

  useEffect(() => {
    if (chatData?.length === FIRST_LOAD_CHAT_DATA) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  useEffect(() => {
    socket.on('dm', handleMessage);
    return () => {
      socket.off('dm', handleMessage);
    };
  }, [socket, handleMessage]);

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

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
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={handleChatBoxSubmit} />
    </Container>
  );
};

export default DirectMessage;
