import useSWR from 'swr';

import { IChat } from '@typings/db';

import { GET_LIST_READ_WORKSPACE_CHANNEL_CHAT_API } from '../api';
import { IListWorkSpaceChannelChatURL, IListWorkSpaceChannelChatHeaderQuery } from '../type';

export default function useListWorkspaceChannelChat(
  url: IListWorkSpaceChannelChatURL,
  query: IListWorkSpaceChannelChatHeaderQuery,
) {
  return useSWR<IChat[]>(GET_LIST_READ_WORKSPACE_CHANNEL_CHAT_API(url, query));
}
