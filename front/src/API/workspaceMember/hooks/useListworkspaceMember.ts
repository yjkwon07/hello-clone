import useSWR from 'swr';

import { IUserWithOnline } from '@typings/db';

import { GET_LIST_READ_WORKSPACE_MEMBER_API } from '../api';
import { IListReadWorkSpaceMemberURL } from '../type';

export default function useListworkspaceMember(url: IListReadWorkSpaceMemberURL) {
  return useSWR<IUserWithOnline[]>(GET_LIST_READ_WORKSPACE_MEMBER_API(url));
}
