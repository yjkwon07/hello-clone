import { userAPI } from '@API/user/requestAPI';
import { listReadChannelAPI } from '@API/workspaceChannel/requestAPI';
import { listReadChannelMemberAPI } from '@API/workspaceChannelMember/requestAPI';
import { listReadWorkSpaceMemberAPI } from '@API/workspaceMember/requestAPI';

export const INIT = undefined;

export const USER_FETCH = userAPI();
export const GET_LIST_CHANNEL_FETCH = listReadChannelAPI;
export const GET_LIST_WORKSPACE_MEMBER_FETCH = listReadWorkSpaceMemberAPI;
export const GET_LIST_WORKSPACE_CHANNEL_MEMBER_FETCH = listReadChannelMemberAPI;
