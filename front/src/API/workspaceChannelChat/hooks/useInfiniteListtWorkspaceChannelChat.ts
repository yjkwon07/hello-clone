import { useSWRInfinite } from 'swr';

import { IChat } from '@typings/db';

import { GET_LIST_READ_WORKSPACE_CHANNEL_CHAT_API } from '../api';
import { IListWorkSpaceChannelChatURL, IListWorkSpaceChannelChatHeaderQuery } from '../type';

export default function useInfiniteListtWorkspaceChannelChat(
  url: IListWorkSpaceChannelChatURL,
  query: IListWorkSpaceChannelChatHeaderQuery,
) {
  return useSWRInfinite<IChat[]>((index) =>
    GET_LIST_READ_WORKSPACE_CHANNEL_CHAT_API(url, { perPage: query.perPage, page: index + 1 }),
  );
}
