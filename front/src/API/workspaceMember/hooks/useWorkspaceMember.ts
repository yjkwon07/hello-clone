import useSWR from 'swr';

import { IUser, IUserWithOnline } from '@typings/db';

import { listReadWorkSpaceMemberAPI, readWorkSpaceMemberAPI } from '../requestAPI';
import { IListReadWorkSpaceMemberURL, IReadWorkSpaceMemberURL } from '../type';

export function useWorkspaceMember(url: IReadWorkSpaceMemberURL) {
  return useSWR<IUser>(readWorkSpaceMemberAPI(url));
}

export function useListworkspaceMember(url: IListReadWorkSpaceMemberURL) {
  return useSWR<IUserWithOnline[]>(listReadWorkSpaceMemberAPI(url));
}
