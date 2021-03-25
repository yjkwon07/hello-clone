import { axios } from '@API/client';

import { GET_ADD_WORKSPACE_CHANNEL_CHAT_API, GET_LIST_READ_WORKSPACE_CHANNEL_CHAT_API } from './api';
import {
  IAddWorkSpaceChannelChatBodyQuery,
  IAddWorkSpaceChannelChatURL,
  IListWorkSpaceChannelChatHeaderQuery,
  IListWorkSpaceChannelChatURL,
} from './type';

export const requestAddWorkSpaceChannelChat = (
  data: IAddWorkSpaceChannelChatBodyQuery,
  url: IAddWorkSpaceChannelChatURL,
) => {
  return axios.post(GET_ADD_WORKSPACE_CHANNEL_CHAT_API(url), data);
};

export const requestListReadWorkSpaceChannelChat = (
  url: IListWorkSpaceChannelChatURL,
  query: IListWorkSpaceChannelChatHeaderQuery,
) => {
  return axios.post(GET_LIST_READ_WORKSPACE_CHANNEL_CHAT_API(url, query));
};
