import userInfoData from '@API/user/queryInfoData';
import channelInfoData from '@API/channel/queryInfoData';

export const INIT = undefined;

export const USER_FETCH = userInfoData.user.API();
export const GET_CHANNEL_FETCH = channelInfoData.readChannel.API;
