import { axios } from '@API/client';
import { GET_LOGIN_API, GET_LOGOUT_API, GET_SIGNUP_API, GET_USER_API } from '@API/user/api';
import { ILoginBodyQuery, ISignupBodyQuery } from '@API/user/type';
import { IUser } from '@typings/db';

export const requestSignup = (data: ISignupBodyQuery) => {
  return axios.post<IUser>(GET_SIGNUP_API(), data);
};

export const requestLogin = (data: ILoginBodyQuery) => {
  return axios.post<IUser>(GET_LOGIN_API(), data);
};

export const requestLogout = () => {
  return axios.post<string>(GET_LOGOUT_API());
};

export const requestReadUser = () => {
  return axios.post<string>(GET_USER_API());
};
