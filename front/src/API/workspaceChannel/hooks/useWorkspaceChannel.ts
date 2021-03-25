import useSWR from 'swr';

import { GET_READ_CHANNEL_API } from '@API/workspaceChannel/api';
import { IChannel } from '@typings/db';

import { IReadWorkspaceChannelURL } from '../type';

export default function useWorkspaceChannel(url: IReadWorkspaceChannelURL) {
  return useSWR<IChannel>(GET_READ_CHANNEL_API(url));
}
