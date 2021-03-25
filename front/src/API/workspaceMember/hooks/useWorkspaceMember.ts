import useSWR from 'swr';

import { IUser } from '@typings/db';

import { GET_READ_WORKSPACE_MEMBER_API } from '../api';
import { IReadWorkSpaceMemberURL } from '../type';

export default function useWorkspaceMember(url: IReadWorkSpaceMemberURL) {
  return useSWR<IUser>(GET_READ_WORKSPACE_MEMBER_API(url));
}
