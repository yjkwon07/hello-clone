import useSWR, { useSWRInfinite } from 'swr';

import { IDM } from '@typings/db';

import { listReadWorkSpaceDmsAPI } from '../reuqestAPI';
import { IListReadWorkSpaceDmsHeaderQuery, IListReadWorkSpaceDmsURL } from '../type';

export function useListWorkspaceDms(url: IListReadWorkSpaceDmsURL, query: IListReadWorkSpaceDmsHeaderQuery) {
  return useSWR<IDM[]>(listReadWorkSpaceDmsAPI(url, query));
}

export function useInfiniteListWorkspaceDms(url: IListReadWorkSpaceDmsURL, query: IListReadWorkSpaceDmsHeaderQuery) {
  return useSWRInfinite<IDM[]>((index) => listReadWorkSpaceDmsAPI(url, { perPage: query.perPage, page: index + 1 }));
}
