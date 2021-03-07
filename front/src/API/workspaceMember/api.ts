import { axios } from '@API/client';

import {
  addWorkSpaceMemberAPI,
  listReadWorkSpaceMemberAPI,
  readWorkSpaceMemberAPI,
  removeWorkspaceMemberAPI,
} from './requestAPI';
import {
  IAddWorkSpaceMemberBodyQuery,
  IAddWorkSpaceMemberURL,
  IListReadWorkSpaceMemberURL,
  IReadWorkSpaceMemberURL,
  IRemoveWorkSpaceMemberURL,
} from './type';

export const addWorkSpaceMember = (data: IAddWorkSpaceMemberBodyQuery, url: IAddWorkSpaceMemberURL) => {
  return axios.post(addWorkSpaceMemberAPI(url), data);
};

export const listReadWorkSpaceMember = (url: IListReadWorkSpaceMemberURL) => {
  return axios.post(listReadWorkSpaceMemberAPI(url));
};

export const readWorkSpaceMember = (url: IReadWorkSpaceMemberURL) => {
  return axios.post(readWorkSpaceMemberAPI(url));
};

export const removeWorkspaceMember = (url: IRemoveWorkSpaceMemberURL) => {
  return axios.post(removeWorkspaceMemberAPI(url));
};
