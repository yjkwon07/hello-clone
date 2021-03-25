import { axios } from '@API/client';
import { GET_ADD_WORKSPACE_API, GET_LIST_READ_WORKSPACE_API } from '@API/workspace/api';
import { IAddWorkSpaceBodyQuery } from '@API/workspace/type';
import { IWorkspace } from '@typings/db';

export const requestAddWorkspace = (data: IAddWorkSpaceBodyQuery) => {
  return axios.post<IWorkspace>(GET_ADD_WORKSPACE_API(), data);
};

export const requestListReadWorkspace = () => {
  return axios.post<IWorkspace[]>(GET_LIST_READ_WORKSPACE_API());
};
