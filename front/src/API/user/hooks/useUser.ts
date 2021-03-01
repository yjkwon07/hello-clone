import useSWR from 'swr';
import queryInfoData from '@API/user/queryInfoData';
import { IUser } from '@typings/db';

// eslint-disable-next-line import/prefer-default-export
export function useUser() {
  return useSWR<IUser | false>(queryInfoData.user.API());
}
