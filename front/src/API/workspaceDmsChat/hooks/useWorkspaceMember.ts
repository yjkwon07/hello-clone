import useSWR, { useSWRInfinite } from 'swr';

import { IDM } from '@typings/db';

import { listReadWorkSpaceDmsChatAPI } from '../reuqestAPI';
import { IListReadWorkSpaceDmsChatHeaderQuery, IListReadWorkSpaceDmsChatURL } from '../type';

export function useListWorkspaceDmsChat(
  url: IListReadWorkSpaceDmsChatURL,
  query: IListReadWorkSpaceDmsChatHeaderQuery,
) {
  return useSWR<IDM[]>(listReadWorkSpaceDmsChatAPI(url, query));
}

export function useInfiniteListWorkspaceDmsChat(
  url: IListReadWorkSpaceDmsChatURL,
  query: IListReadWorkSpaceDmsChatHeaderQuery,
) {
  return useSWRInfinite<IDM[]>((index) =>
    listReadWorkSpaceDmsChatAPI(url, { perPage: query.perPage, page: index + 1 }),
  );
}
