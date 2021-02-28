import { axios } from '@API/client';
import queryInfoData from '@API/workspaceChannelMember/queryInfoData';

export interface IAddChannelMember {
  email: string;
}
export interface IAddAddChannelMemberURL {
  workspace: string;
  channel: string;
}

export const addChannelMember = (data: IAddChannelMember, url: IAddAddChannelMemberURL) => {
  const queryData = queryInfoData.addChannelMember;
  return axios.post(queryData.API(url.workspace, url.channel), data);
};

export interface IListReadChannelMemberURL {
  workspace: string;
  channel: string;
}

export const listReadChannel = (url: IListReadChannelMemberURL) => {
  const queryData = queryInfoData.listReadChannel;
  return axios.get(queryData.API(url.workspace, url.channel));
};
