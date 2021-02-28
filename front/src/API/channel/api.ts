import { axios } from '@API/client';
import queryInfoData from '@API/channel/queryInfoData';

export interface IAddChannel {
  name: string;
}
export interface IAddChannelURL {
  workspace: string;
}

export const addChannel = (data: IAddChannel, url: IAddChannelURL) => {
  const queryData = queryInfoData.addChannel;
  return axios.post(queryData.API(url.workspace), data);
};

export interface IReadChannelURL {
  workspace: string;
}

export const reeadChannel = (url: IReadChannelURL) => {
  const queryData = queryInfoData.readChannel;
  return axios.get(queryData.API(url.workspace));
};
