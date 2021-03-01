import { axios } from '@API/client';
import queryInfoData from '@API/user/queryInfoData';
import { ILogin, ISignup } from '@API/user/type';
import { IUser } from '@typings/db';

export const signup = (data: ISignup) => {
  const queryData = queryInfoData.signup;
  return axios.post<IUser>(queryData.API(), data);
};

export const login = (data: ILogin) => {
  const queryData = queryInfoData.login;
  return axios.post<IUser>(queryData.API(), data);
};

export const logout = () => {
  const queryData = queryInfoData.logout;
  return axios.post<string>(queryData.API());
};

export const readUser = () => {
  const queryData = queryInfoData.user;
  return axios.post<string>(queryData.API());
};
