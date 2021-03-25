import { axios } from '@API/client';

import { GET_ADD_CHANNEL_MEMBER_API, GET_LIST_READ_CHANNEL_MEMBER_API } from './api';
import { IAddChannelMemberBodyQuery, IAddAddChannelMemberURL, IListReadChannelMemberURL } from './type';

export const requestAddChannelMember = (data: IAddChannelMemberBodyQuery, url: IAddAddChannelMemberURL) => {
  return axios.post(GET_ADD_CHANNEL_MEMBER_API(url), data);
};

export const requestListReadChannelMember = (url: IListReadChannelMemberURL) => {
  return axios.get(GET_LIST_READ_CHANNEL_MEMBER_API(url));
};
