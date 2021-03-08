import React, { useCallback, RefObject, VFC, MutableRefObject } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

import { IChat, IDM } from '@typings/db';

import Chat from './Chat';
import { ChatZone, Section, StickyHeader } from './styles';

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isReachingEndData: boolean;
  scrollRef: RefObject<Scrollbars>;
}

const TOP = 0;

const ChatList: VFC<Props> = ({ chatSections, setSize, scrollRef, isReachingEndData }) => {
  const onScroll = useCallback(
    async (values) => {
      try {
        if (values.scrollTop === TOP && !isReachingEndData) {
          await setSize((prevSize) => prevSize + 1);
          // 스크롤 위치 유지
          const currentScrollRef = (scrollRef as MutableRefObject<Scrollbars>)?.current;
          if (currentScrollRef) {
            currentScrollRef.scrollTop(currentScrollRef.getScrollHeight() - values.scrollHeight);
          }
        }
      } catch (error) {
        console.dir('error :>> ', error);
      }
    },
    [scrollRef, isReachingEndData, setSize],
  );

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button type="button">{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
