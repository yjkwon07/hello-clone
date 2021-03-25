import { IAddAddChannelMemberURL, IListReadChannelMemberURL } from './type';

/**
 * * :workspace 내부의 :channel로 멤버 초대 POST
 * * /api/workspaces/{workspace}/channels/{channel}/members
 * * return: 'ok'
 */
export function GET_ADD_CHANNEL_MEMBER_API(url: IAddAddChannelMemberURL) {
  return `api/workspaces/${url.workspace}/channels/${url.channel}/members`;
}

/**
 * * :workspace 내부의 :channel 멤버 목록을 가져옴 GET
 * * /api/workspaces/{workspace}/channels/{channel}/members
 * * return: IUser[]
 */
export function GET_LIST_READ_CHANNEL_MEMBER_API(url: IListReadChannelMemberURL) {
  return `api/workspaces/${url.workspace}/channels/${url.channel}/members`;
}
