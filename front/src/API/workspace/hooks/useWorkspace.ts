import useSWR from 'swr';

import { listReadWorkSpaceAPI } from '@API/workspace/requestAPI';
import { IWorkspace } from '@typings/db';

// eslint-disable-next-line import/prefer-default-export
export function useListWorkspace() {
  return useSWR<IWorkspace[]>(listReadWorkSpaceAPI());
}
