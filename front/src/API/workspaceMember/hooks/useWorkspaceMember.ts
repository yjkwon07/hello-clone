import useSWR from 'swr';

import queryInfoData from '@API/workspaceMember/queryInfoData';
import { IUserWithOnline } from '@typings/db';

// eslint-disable-next-line import/prefer-default-export
export function useListworkspaceMember(workspace: string) {
  return useSWR<IUserWithOnline[]>(queryInfoData.listReadWorkSpaceMember.API(workspace));
}
