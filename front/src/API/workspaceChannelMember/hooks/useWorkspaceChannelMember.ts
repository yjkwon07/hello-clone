import useSWR from 'swr';
import queryInfoData from '@API/workspaceChannelMember/queryInfoData';
import { IUser } from '@typings/db';

// eslint-disable-next-line import/prefer-default-export
export function useListWorkspaceChannelMember(workspace: string, channel: string) {
  return useSWR<IUser[]>(queryInfoData.listReadChannelMember.API(workspace, channel));
}
