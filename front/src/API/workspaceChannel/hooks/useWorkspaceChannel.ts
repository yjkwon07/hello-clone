import useSWR from 'swr';

import queryInfoData from '@API/workspaceChannel/queryInfoData';
import { IChannel } from '@typings/db';

export function useListWorkspaceChannel(workspace: string) {
  return useSWR<IChannel[]>(queryInfoData.listReadChannel.API(workspace));
}

export function useWorkspaceChannel(workspace: string, channel: string) {
  return useSWR<IChannel>(queryInfoData.readChannel.API(workspace, channel));
}
