import { axios } from '@API/client';
import queryInfoData from '@API/workspaceMember/queryInfoData';

export interface IAddWorkSpaceMember {
  email: string;
}

export interface IAddWorkSpaceMemberURL {
  workspace: string;
}

export const addWorkSpaceMember = (data: IAddWorkSpaceMember, url: IAddWorkSpaceMemberURL) => {
  const queryData = queryInfoData.addWorkSpaceMember;
  return axios.post(queryData.API(url.workspace), data);
};

export interface IListReadWorkSpaceMemberURL {
  workspace: string;
}

export const listReadWorkSpaceMember = (url: IListReadWorkSpaceMemberURL) => {
  const queryData = queryInfoData.listReadWorkSpaceMember;
  return axios.post(queryData.API(url.workspace));
};

export interface IRemoveWorkSpaceMemberURL {
  workspace: string;
  mberId: string;
}

export const removeWorkspaceMember = (url: IRemoveWorkSpaceMemberURL) => {
  const queryData = queryInfoData.removeWorkspaceMember;
  return axios.post(queryData.API(url.workspace, url.mberId));
};
