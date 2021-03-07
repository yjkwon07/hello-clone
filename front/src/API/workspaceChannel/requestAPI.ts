import { IAddCWorkspaceChannelURL, IListReadWorkspaceChannelURL, IReadWorkspaceChannelURL } from './type';

/**
 * * :workspace 내부에 채널을 생성함 POST
 * * api/workspaces/{workspace}/channels
 * * return: IChannel
 */
export function addChannelAPI(url: IAddCWorkspaceChannelURL) {
  return `api/workspaces/${url.workspace}/channels`;
}

/**
 * * :workspace 내부의 내가 속해있는 채널 리스트를 가져옴 GET
 * * api/workspaces/{workspace}/channels
 * * return: IChannel[]
 */
export function listReadChannelAPI(url: IListReadWorkspaceChannelURL) {
  return `api/workspaces/${url.workspace}/channels`;
}

/**
 * * :workspace 내부의 :channel 정보를 가져옴 GET
 * * api/workspaces/{workspace}/channels/{channel}
 * * return: IChannel
 */
export function readChannelAPI(url: IReadWorkspaceChannelURL) {
  return `api/workspaces/${url.workspace}/channels/${url.channel}`;
}
