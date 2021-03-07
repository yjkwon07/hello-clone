import useSWR from 'swr';

import { IDM } from '@typings/db';

import { listReadWorkSpaceDmsAPI } from '../reuqestAPI';
import { IListReadWorkSpaceDmsHeaderQuery, IListReadWorkSpaceDmsURL } from '../type';

// eslint-disable-next-line import/prefer-default-export
export function useListWorkspaceDms(url: IListReadWorkSpaceDmsURL, query: IListReadWorkSpaceDmsHeaderQuery) {
  return useSWR<IDM[]>(listReadWorkSpaceDmsAPI(url, query));
}
