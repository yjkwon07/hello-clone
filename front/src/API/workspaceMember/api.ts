import { axios } from '@API/client';
import queryInfoData from '@API/workspaceMember/queryInfoData';
import {
  IAddWorkSpaceMember,
  IAddWorkSpaceMemberURL,
  IListReadWorkSpaceMemberURL,
  IRemoveWorkSpaceMemberURL,
} from '@API/workspaceMember/type';

export const addWorkSpaceMember = (data: IAddWorkSpaceMember, url: IAddWorkSpaceMemberURL) => {
  const queryData = queryInfoData.addWorkSpaceMember;
  return axios.post(queryData.API(url.workspace), data);
};

export const listReadWorkSpaceMember = (url: IListReadWorkSpaceMemberURL) => {
  const queryData = queryInfoData.listReadWorkSpaceMember;
  return axios.post(queryData.API(url.workspace));
};

export const removeWorkspaceMember = (url: IRemoveWorkSpaceMemberURL) => {
  const queryData = queryInfoData.removeWorkspaceMember;
  return axios.post(queryData.API(url.workspace, url.mberId));
};
