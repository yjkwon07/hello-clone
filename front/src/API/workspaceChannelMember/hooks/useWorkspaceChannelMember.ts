import useSWR from 'swr';

import { listReadChannelMemberAPI } from '@API/workspaceChannelMember/requestAPI';
import { IUser } from '@typings/db';

import { IListReadChannelMemberURL } from '../type';

// eslint-disable-next-line import/prefer-default-export
export function useListWorkspaceChannelMember(url: IListReadChannelMemberURL) {
  return useSWR<IUser[]>(listReadChannelMemberAPI(url));
}
