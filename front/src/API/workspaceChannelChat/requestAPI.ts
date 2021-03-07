import {
  IAddWorkSpaceChannelChatURL,
  IListWorkSpaceChannelChatHeaderQuery,
  IListWorkSpaceChannelChatURL,
} from './type';

/**
 * * :workspace 내부의 :channel의 채팅을 저장 POST
 * * message 소켓 이벤트가 emit됨
 * * api/workspaces/:workspace/channels/:channel/chats
 * * return: 'ok'
 */
export function addWorkSpaceChannelChatAPI(url: IAddWorkSpaceChannelChatURL) {
  return `api/workspaces/${url.workspace}/channels/${url.channel}/chats`;
}

/**
 * * :workspace 내부의 :channel의 채팅을 가져옴 GET
 * * /api/workspaces/:workspace/channels/:channel/chats
 * * return: IChat[]
 */
export function listReadWorkSpaceChannelChatAPI(
  url: IListWorkSpaceChannelChatURL,
  query: IListWorkSpaceChannelChatHeaderQuery,
) {
  return `api/workspaces/${url.workspace}/channels/${url.channel}/chats?perPage=${query.perPage}&page=${query.page}`;
}
