import useSWR from 'swr';

import { GET_LIST_READ_WORKSPACE_API } from '@API/workspace/api';
import { IWorkspace } from '@typings/db';

export default function useListWorkspace() {
  return useSWR<IWorkspace[]>(GET_LIST_READ_WORKSPACE_API());
}
