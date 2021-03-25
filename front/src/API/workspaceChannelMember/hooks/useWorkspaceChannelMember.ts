import useSWR from 'swr';

import { GET_LIST_READ_CHANNEL_MEMBER_API } from '@API/workspaceChannelMember/api';
import { IUser } from '@typings/db';

import { IListReadChannelMemberURL } from '../type';

export default function useListWorkspaceChannelMember(url: IListReadChannelMemberURL) {
  return useSWR<IUser[]>(GET_LIST_READ_CHANNEL_MEMBER_API(url));
}
