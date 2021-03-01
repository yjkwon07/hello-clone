import useSWR from 'swr';
import queryInfoData from '@API/workspaceMember/queryInfoData';
import { IUser } from '@typings/db';

// eslint-disable-next-line import/prefer-default-export
export function useListworkspaceMember(workspace: string) {
  return useSWR<IUser[]>(queryInfoData.listReadWorkSpaceMember.API(workspace));
}
