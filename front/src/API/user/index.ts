import { axios } from '@API/client';
import queryInfoData from '@API/user/queryInfoData';

interface ISignup {
  email: string;
  nickname: string;
  password: string;
}

export const signup = (data: ISignup) => {
  const queryData = queryInfoData.signup;
  return axios.post(queryData.API(), data);
};

interface ILogin {
  email: string;
  password: string;
}

export const login = (data: ILogin) => {
  const queryData = queryInfoData.login;
  return axios.post(queryData.API(), data);
};
