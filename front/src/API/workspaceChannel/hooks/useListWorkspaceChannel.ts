import useSWR from 'swr';

import { GET_LIST_READ_CHANNEL_API } from '@API/workspaceChannel/api';
import { IChannel } from '@typings/db';

import { IAddCWorkspaceChannelURL } from '../type';

export default function useListWorkspaceChannel(url: IAddCWorkspaceChannelURL) {
  return useSWR<IChannel[]>(GET_LIST_READ_CHANNEL_API(url));
}
