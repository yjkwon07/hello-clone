import { axios } from '@API/client';
import { addWorkSpaceAPI, listReadWorkSpaceAPI } from '@API/workspace/requestAPI';
import { IAddWorkSpaceBodyQuery } from '@API/workspace/type';
import { IWorkspace } from '@typings/db';

export const addWorkSpace = (data: IAddWorkSpaceBodyQuery) => {
  return axios.post<IWorkspace>(addWorkSpaceAPI(), data);
};

export const listReadWorkSpace = () => {
  return axios.post<IWorkspace[]>(listReadWorkSpaceAPI());
};
