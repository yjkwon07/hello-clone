import { useSWRInfinite } from 'swr';

import { IDM } from '@typings/db';

import { GET_LIST_READ_WORKSPACE_DMS_CHAT_API } from '../api';
import { IListReadWorkSpaceDmsChatHeaderQuery, IListReadWorkSpaceDmsChatURL } from '../type';

export default function useInfiniteListWorkspaceDmsChat(
  url: IListReadWorkSpaceDmsChatURL,
  query: IListReadWorkSpaceDmsChatHeaderQuery,
) {
  return useSWRInfinite<IDM[]>((index) =>
    GET_LIST_READ_WORKSPACE_DMS_CHAT_API(url, { perPage: query.perPage, page: index + 1 }),
  );
}
