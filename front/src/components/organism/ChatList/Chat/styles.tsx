import styled from '@emotion/styled';

// eslint-disable-next-line import/prefer-default-export
export const ChatWrapper = styled.div`
  display: flex;
  padding: 8px 20px;
  &:hover {
    background: #eee;
  }
  & .chat-img {
    display: flex;
    width: 36px;
    margin-right: 8px;
    & img {
      width: 36px;
      height: 36px;
    }
  }
`;
