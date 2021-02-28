import { axios } from '@API/client';
import queryInfoData from '@API/user/queryInfoData';

export interface ISignup {
  email: string;
  nickname: string;
  password: string;
}

export const signup = (data: ISignup) => {
  const queryData = queryInfoData.signup;
  return axios.post(queryData.API(), data);
};

export interface ILogin {
  email: string;
  password: string;
}

export const login = (data: ILogin) => {
  const queryData = queryInfoData.login;
  return axios.post(queryData.API(), data);
};

export const logout = () => {
  const queryData = queryInfoData.logout;
  return axios.post(queryData.API());
};
