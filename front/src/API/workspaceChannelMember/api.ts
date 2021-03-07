import { axios } from '@API/client';

import { addChannelMemberAPI, listReadChannelMemberAPI } from './requestAPI';
import { IAddChannelMemberBodyQuery, IAddAddChannelMemberURL, IListReadChannelMemberURL } from './type';

export const addChannelMember = (data: IAddChannelMemberBodyQuery, url: IAddAddChannelMemberURL) => {
  return axios.post(addChannelMemberAPI(url), data);
};

export const listReadChannelMember = (url: IListReadChannelMemberURL) => {
  return axios.get(listReadChannelMemberAPI(url));
};
