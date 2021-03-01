import { axios } from '@API/client';
import queryInfoData from '@API/workspaceChannelMember/queryInfoData';
import { IAddChannelMember, IAddAddChannelMemberURL, IListReadChannelMemberURL } from './type';

export const addChannelMember = (data: IAddChannelMember, url: IAddAddChannelMemberURL) => {
  const queryData = queryInfoData.addChannelMember;
  return axios.post(queryData.API(url.workspace, url.channel), data);
};

export const listReadChannelMember = (url: IListReadChannelMemberURL) => {
  const queryData = queryInfoData.listReadChannelMember;
  return axios.get(queryData.API(url.workspace, url.channel));
};
