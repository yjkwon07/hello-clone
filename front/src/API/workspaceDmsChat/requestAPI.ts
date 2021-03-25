import { axios } from '@API/client';

import { GET_ADD_WORKSPACE_DMS_CHAT_API, GET_LIST_READ_WORKSPACE_DMS_CHAT_API } from './api';
import {
  IAddWorkSpaceDmsChat,
  IAddWorkSpaceDmsChatURL,
  IListReadWorkSpaceDmsChatHeaderQuery,
  IListReadWorkSpaceDmsChatURL,
} from './type';

export const requestAddWorkSpaceDmsChat = (data: IAddWorkSpaceDmsChat, url: IAddWorkSpaceDmsChatURL) => {
  return axios.post(GET_ADD_WORKSPACE_DMS_CHAT_API(url), data);
};

export const requestListReadWorkSpaceDmsChat = (
  url: IListReadWorkSpaceDmsChatURL,
  query: IListReadWorkSpaceDmsChatHeaderQuery,
) => {
  return axios.get(GET_LIST_READ_WORKSPACE_DMS_CHAT_API(url, query));
};
