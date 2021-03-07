import { axios } from '@API/client';
import { IChannel } from '@typings/db';

import { addChannelAPI, listReadChannelAPI, readChannelAPI } from './requestAPI';
import {
  IAddCWorkspaceChannelURL,
  IAddWorkspaceChannelBodyQuery,
  IListReadWorkspaceChannelURL,
  IReadWorkspaceChannelURL,
} from './type';

export const addChannel = (data: IAddWorkspaceChannelBodyQuery, url: IAddCWorkspaceChannelURL) => {
  return axios.post<IChannel>(addChannelAPI(url), data);
};

export const listReadChannel = (url: IListReadWorkspaceChannelURL) => {
  return axios.get<IChannel[]>(listReadChannelAPI(url));
};

export const readChannel = (url: IReadWorkspaceChannelURL) => {
  return axios.get<IChannel>(readChannelAPI(url));
};
