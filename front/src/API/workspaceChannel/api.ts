import { axios } from '@API/client';
import queryInfoData from '@API/workspaceChannel/queryInfoData';
import {
  IAddCWorkspaceChannelURL,
  IAddWorkspaceChannel,
  IListReadWorkspaceChannelURL,
  IReadWorkspaceChannelURL,
} from '@API/workspaceChannel/type';
import { IChannel } from '@typings/db';

export const addChannel = (data: IAddWorkspaceChannel, url: IAddCWorkspaceChannelURL) => {
  const queryData = queryInfoData.addChannel;
  return axios.post<IChannel>(queryData.API(url.workspace), data);
};

export const listReadChannel = (url: IListReadWorkspaceChannelURL) => {
  const queryData = queryInfoData.listReadChannel;
  return axios.get<IChannel[]>(queryData.API(url.workspace));
};

export const readChannel = (url: IReadWorkspaceChannelURL) => {
  const queryData = queryInfoData.readChannel;
  return axios.get<IChannel>(queryData.API(url.workspace, url.channel));
};
