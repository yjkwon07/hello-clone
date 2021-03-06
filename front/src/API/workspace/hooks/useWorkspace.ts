import useSWR from 'swr';

import queryInfoData from '@API/workspace/queryInfoData';
import { IWorkspace } from '@typings/db';

// eslint-disable-next-line import/prefer-default-export
export function useListWorkspace() {
  return useSWR<IWorkspace[]>(queryInfoData.listReadWorkSpace.API());
}
