import useSWR, { useSWRInfinite } from 'swr';

import { IChat } from '@typings/db';

import { listReadWorkSpaceChannelChatAPI } from '../requestAPI';
import { IListWorkSpaceChannelChatURL, IListWorkSpaceChannelChatHeaderQuery } from '../type';

export function useListWorkspaceChannelChat(
  url: IListWorkSpaceChannelChatURL,
  query: IListWorkSpaceChannelChatHeaderQuery,
) {
  return useSWR<IChat[]>(listReadWorkSpaceChannelChatAPI(url, query));
}

export function useInfiniteListtWorkspaceChannelChat(
  url: IListWorkSpaceChannelChatURL,
  query: IListWorkSpaceChannelChatHeaderQuery,
) {
  return useSWRInfinite<IChat[]>((index) =>
    listReadWorkSpaceChannelChatAPI(url, { perPage: query.perPage, page: index + 1 }),
  );
}
