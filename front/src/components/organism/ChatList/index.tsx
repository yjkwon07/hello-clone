import React, { useCallback, RefObject, VFC, MutableRefObject } from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

import { IChat, IDM } from '@typings/db';

import Chat from './Chat';
import { ChatZone, Section, StickyHeader } from './styles';

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  scrollRef: RefObject<Scrollbars>;
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isReachingEndData: boolean;
}

const TOP = 0;

const ChatList: VFC<Props> = ({ chatSections, setSize, scrollRef, isReachingEndData }) => {
  const handleScroll = useCallback(
    async (values) => {
      try {
        if (values.scrollTop === TOP && !isReachingEndData) {
          const currentScrollRef = (scrollRef as MutableRefObject<Scrollbars>)?.current;
          await setSize((prevSize) => prevSize + 1);
          // 스크롤 위치 유지
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
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={handleScroll}>
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
