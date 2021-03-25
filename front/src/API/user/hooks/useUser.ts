import useSWR from 'swr';

import { IUser } from '@typings/db';

import { GET_USER_API } from '../api';

export default function useUser() {
  return useSWR<IUser | false>(GET_USER_API());
}
