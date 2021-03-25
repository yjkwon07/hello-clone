import { axios } from '@API/client';
import { IChannel } from '@typings/db';

import { GET_ADD_CHANNEL_API, GET_LIST_READ_CHANNEL_API, GET_READ_CHANNEL_API } from './api';
import {
  IAddCWorkspaceChannelURL,
  IAddWorkspaceChannelBodyQuery,
  IListReadWorkspaceChannelURL,
  IReadWorkspaceChannelURL,
} from './type';

export const requestAddChannel = (data: IAddWorkspaceChannelBodyQuery, url: IAddCWorkspaceChannelURL) => {
  return axios.post<IChannel>(GET_ADD_CHANNEL_API(url), data);
};

export const requestListReadChannel = (url: IListReadWorkspaceChannelURL) => {
  return axios.get<IChannel[]>(GET_LIST_READ_CHANNEL_API(url));
};

export const requestReadChannel = (url: IReadWorkspaceChannelURL) => {
  return axios.get<IChannel>(GET_READ_CHANNEL_API(url));
};
