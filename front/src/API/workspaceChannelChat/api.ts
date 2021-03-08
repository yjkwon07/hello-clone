import { axios } from '@API/client';

import { addWorkSpaceChannelChatAPI, listReadWorkSpaceChannelChatAPI } from './requestAPI';
import {
  IAddWorkSpaceChannelChatBodyQuery,
  IAddWorkSpaceChannelChatURL,
  IListWorkSpaceChannelChatHeaderQuery,
  IListWorkSpaceChannelChatURL,
} from './type';

export const addWorkSpaceChannelChat = (data: IAddWorkSpaceChannelChatBodyQuery, url: IAddWorkSpaceChannelChatURL) => {
  return axios.post(addWorkSpaceChannelChatAPI(url), data);
};

export const listReadWorkSpaceChannelChat = (
  url: IListWorkSpaceChannelChatURL,
  query: IListWorkSpaceChannelChatHeaderQuery,
) => {
  return axios.post(listReadWorkSpaceChannelChatAPI(url, query));
};
