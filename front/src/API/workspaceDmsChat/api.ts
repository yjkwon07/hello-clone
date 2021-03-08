import { axios } from '@API/client';

import { addWorkSpaceDmsChatAPI, listReadWorkSpaceDmsChatAPI } from './reuqestAPI';
import {
  IAddWorkSpaceDmsChat,
  IAddWorkSpaceDmsChatURL,
  IListReadWorkSpaceDmsChatHeaderQuery,
  IListReadWorkSpaceDmsChatURL,
} from './type';

export const addWorkSpaceDmsChat = (data: IAddWorkSpaceDmsChat, url: IAddWorkSpaceDmsChatURL) => {
  return axios.post(addWorkSpaceDmsChatAPI(url), data);
};

export const listReadWorkSpaceDmsChat = (
  url: IListReadWorkSpaceDmsChatURL,
  query: IListReadWorkSpaceDmsChatHeaderQuery,
) => {
  return axios.get(listReadWorkSpaceDmsChatAPI(url, query));
};
