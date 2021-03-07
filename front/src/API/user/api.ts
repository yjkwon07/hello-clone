import { axios } from '@API/client';
import { loginAPI, logoutAPI, signupAPI, userAPI } from '@API/user/requestAPI';
import { ILoginBodyQuery, ISignupBodyQuery } from '@API/user/type';
import { IUser } from '@typings/db';

export const signup = (data: ISignupBodyQuery) => {
  return axios.post<IUser>(signupAPI(), data);
};

export const login = (data: ILoginBodyQuery) => {
  return axios.post<IUser>(loginAPI(), data);
};

export const logout = () => {
  return axios.post<string>(logoutAPI());
};

export const readUser = () => {
  return axios.post<string>(userAPI());
};
