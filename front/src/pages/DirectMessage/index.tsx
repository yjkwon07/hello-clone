import React, { useCallback, useEffect, useRef } from 'react';

// import { useParams } from 'react-router-dom';
import gravatar from 'gravatar';

import { ChatBox } from '@components/organism';
import { Container, Header } from '@pages/DirectMessage/styles';
// import { IDM } from '@typings/db';

const DirectMessage = () => {
  // const { workspace, id } = useParams<{ workspace: string; id: string }>();
  // const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  // const { data: myData } = useSWR('/api/users', fetcher);
  // const isEmpty = chatData?.[0]?.length === 0;
  // const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;

  return (
    <Container>
      <Header>
        {/* <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span> */}
      </Header>
      {/* <ChatList chatSections={chatSections} scrollRef={scrollbarRef} setSize={setSize} isReachingEnd={isReachingEnd} /> */}
      <ChatBox
        chat="chat"
        onSubmitForm={(data) => {
          console.log('data', data);
        }}
      />
    </Container>
  );
};

export default DirectMessage;
