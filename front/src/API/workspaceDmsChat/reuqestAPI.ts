import { IAddWorkSpaceDmsChatURL, IListReadWorkSpaceDmsChatURL, IListReadWorkSpaceDmsChatHeaderQuery } from './type';

/**
 * * :workspace 내부의 :mberId와 나눈 dm을 저장 POST
 * * dm 소켓 이벤트가 emit됨
 * * api/workspaces/{workspace}/dms/{mberId}/chats
 * * return: 'ok'
 */
export function addWorkSpaceDmsChatAPI(url: IAddWorkSpaceDmsChatURL) {
  return `api/workspaces/${url.workspace}/dms/${url.mberId}/chats`;
}

/**
 * * :workspace 내부의 :mberId와 나눈 dm을 가져옴 GET
 * * /workspaces/:workspace/dms/:id/chats?perPage={perPage}&page={page}
 * * return: IDM[]
 */
export function listReadWorkSpaceDmsChatAPI(
  url: IListReadWorkSpaceDmsChatURL,
  query: IListReadWorkSpaceDmsChatHeaderQuery,
) {
  return `api/workspaces/${url.workspace}/dms/${url.mberId}/chats?perPage=${query.perPage}&page=${query.page}`;
}
