import { axios } from '@API/client';

export default async function fetcher(url: string) {
  return axios.get(url).then((response) => response.data);
}
