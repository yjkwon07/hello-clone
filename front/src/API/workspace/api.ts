import { axios } from '@API/client';
import queryInfoData from '@API/workspace/queryInfoData';
import { IAddWorkSpace } from '@API/workspace/type';
import { IWorkspace } from '@typings/db';

export const addWorkSpace = (data: IAddWorkSpace) => {
  const queryData = queryInfoData.addWorkSpace;
  return axios.post<IWorkspace>(queryData.API(), data);
};

export const listReadWorkSpace = () => {
  const queryData = queryInfoData.listReadWorkSpace;
  return axios.post<IAddWorkSpace[]>(queryData.API());
};
