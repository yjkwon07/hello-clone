import { axios } from '@API/client';
import queryInfoData from '@API/workspaceChannel/queryInfoData';

export interface IAddWorkspaceChannel {
  name: string;
}
export interface IAddCWorkspaceChannelURL {
  workspace: string;
}

export const addChannel = (data: IAddWorkspaceChannel, url: IAddCWorkspaceChannelURL) => {
  const queryData = queryInfoData.addChannel;
  return axios.post(queryData.API(url.workspace), data);
};

export interface IListReadWorkspaceChannelURL {
  workspace: string;
}

export const listReadChannel = (url: IListReadWorkspaceChannelURL) => {
  const queryData = queryInfoData.listReadChannel;
  return axios.get(queryData.API(url.workspace));
};

export interface IReadWorkspaceChannelURL {
  workspace: string;
  channel: string;
}

export const readChannel = (url: IReadWorkspaceChannelURL) => {
  const queryData = queryInfoData.readChannel;
  return axios.get(queryData.API(url.workspace, url.channel));
};
