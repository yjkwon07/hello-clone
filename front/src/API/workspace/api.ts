import { axios } from '@API/client';
import queryInfoData from '@API/workspace/queryInfoData';

export interface IAddWorkSpace {
  workspace: string;
  url: string;
}

export const addWorkSpace = (data: IAddWorkSpace) => {
  const queryData = queryInfoData.addWorkSpace;
  return axios.post(queryData.API(), data);
};
