import { axios } from '@API/client';

import {
  GET_ADD_WORKSPACE_MEMBER_API,
  GET_LIST_READ_WORKSPACE_MEMBER_API,
  GET_READ_WORKSPACE_MEMBER_API,
  GET_REMOVE_WORKSPACE_MEMBER_API,
} from './api';
import {
  IAddWorkSpaceMemberBodyQuery,
  IAddWorkSpaceMemberURL,
  IListReadWorkSpaceMemberURL,
  IReadWorkSpaceMemberURL,
  IRemoveWorkSpaceMemberURL,
} from './type';

export const requestAddWorkSpaceMember = (data: IAddWorkSpaceMemberBodyQuery, url: IAddWorkSpaceMemberURL) => {
  return axios.post(GET_ADD_WORKSPACE_MEMBER_API(url), data);
};

export const requestListReadWorkSpaceMember = (url: IListReadWorkSpaceMemberURL) => {
  return axios.post(GET_LIST_READ_WORKSPACE_MEMBER_API(url));
};

export const requestReadWorkSpaceMember = (url: IReadWorkSpaceMemberURL) => {
  return axios.post(GET_READ_WORKSPACE_MEMBER_API(url));
};

export const requsetRemoveWorkspaceMember = (url: IRemoveWorkSpaceMemberURL) => {
  return axios.post(GET_REMOVE_WORKSPACE_MEMBER_API(url));
};
