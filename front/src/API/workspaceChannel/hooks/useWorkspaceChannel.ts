import useSWR from 'swr';

import { listReadChannelAPI, readChannelAPI } from '@API/workspaceChannel/requestAPI';
import { IChannel } from '@typings/db';

import { IAddCWorkspaceChannelURL, IReadWorkspaceChannelURL } from '../type';

export function useWorkspaceChannel(url: IReadWorkspaceChannelURL) {
  return useSWR<IChannel>(readChannelAPI(url));
}

export function useListWorkspaceChannel(url: IAddCWorkspaceChannelURL) {
  return useSWR<IChannel[]>(listReadChannelAPI(url));
}
