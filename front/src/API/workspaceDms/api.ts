import { axios } from '@API/client';

import { addWorkSpaceDmsAPI, listReadWorkSpaceDmsAPI } from './reuqestAPI';
import {
  IAddWorkSpaceDms,
  IAddWorkSpaceDmsURL,
  IListReadWorkSpaceDmsHeaderQuery,
  IListReadWorkSpaceDmsURL,
} from './type';

export const addWorkSpaceDms = (data: IAddWorkSpaceDms, url: IAddWorkSpaceDmsURL) => {
  return axios.post(addWorkSpaceDmsAPI(url), data);
};

export const listReadWorkSpaceDms = (url: IListReadWorkSpaceDmsURL, query: IListReadWorkSpaceDmsHeaderQuery) => {
  return axios.get(listReadWorkSpaceDmsAPI(url, query));
};
