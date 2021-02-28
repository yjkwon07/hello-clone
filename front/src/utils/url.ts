export const HOME_URL = '/';
export const LOGIN_URL = '/login';
export const SIGNUP_URL = '/signup';
export const WORKSPACE_URL = '/workspace/:workspace';
export const CHANNEL_URL = '/workspace/:workspace/channel/:channel';
export const DM_URL = '/workspace/:workspace/dm/:id';

export const GET_WORKSPACE_URL = (workspace: string) => {
  return WORKSPACE_URL.replace(':workspace', workspace);
};
export const GET_CHANNEL_URL = (workspace: string, channel: string) => {
  return CHANNEL_URL.replace(':workspace', workspace).replace(':channel', channel);
};
export const GET_DM_URL = (workspace: string, dmId: string) => {
  return CHANNEL_URL.replace(':workspace', workspace).replace(':id', dmId);
};
