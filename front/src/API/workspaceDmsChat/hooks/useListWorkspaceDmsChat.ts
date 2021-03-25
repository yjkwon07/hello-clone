import useSWR from 'swr';

import { IDM } from '@typings/db';

import { GET_LIST_READ_WORKSPACE_DMS_CHAT_API } from '../api';
import { IListReadWorkSpaceDmsChatHeaderQuery, IListReadWorkSpaceDmsChatURL } from '../type';

export default function useListWorkspaceDmsChat(
  url: IListReadWorkSpaceDmsChatURL,
  query: IListReadWorkSpaceDmsChatHeaderQuery,
) {
  return useSWR<IDM[]>(GET_LIST_READ_WORKSPACE_DMS_CHAT_API(url, query));
}
