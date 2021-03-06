import userInfoData from '@API/user/queryInfoData';
import channelInfoData from '@API/workspaceChannel/queryInfoData';
import workspaceChannelMemberInfoData from '@API/workspaceChannelMember/queryInfoData';
import workspaceMemberInfoData from '@API/workspaceMember/queryInfoData';

export const INIT = undefined;

export const USER_FETCH = userInfoData.user.API();
export const GET_LIST_CHANNEL_FETCH = channelInfoData.listReadChannel.API;
export const GET_LIST_WORKSPACE_MEMBER_FETCH = workspaceMemberInfoData.listReadWorkSpaceMember.API;
export const GET_LIST_WORKSPACE_CHANNEL_MEMBER_FETCH = workspaceChannelMemberInfoData.listReadChannelMember.API;
