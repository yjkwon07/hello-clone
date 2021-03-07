import useSWR from 'swr';

import { userAPI } from '@API/user/requestAPI';
import { IUser } from '@typings/db';

// eslint-disable-next-line import/prefer-default-export
export function useUser() {
  return useSWR<IUser | false>(userAPI());
}
