import { IAddWorkSpaceDmsURL, IListReadWorkSpaceDmsURL, IListReadWorkSpaceDmsHeaderQuery } from './type';

/**
 * * :workspace 내부의 :mberId와 나눈 dm을 저장 POST
 * * dm 소켓 이벤트가 emit됨
 * * api/workspaces/{workspace}/dms/{mberId}/chat
 * * return: 'ok'
 */
export function addWorkSpaceDmsAPI(url: IAddWorkSpaceDmsURL) {
  return `api/workspaces/${url.workspace}/dms/${url.mberId}/chat`;
}

/**
 * * :workspace 내부의 :mberId와 나눈 dm을 가져옴 GET
 * * /workspaces/:workspace/dms/:id/chats?perPage={perPage}&page={page}
 * * return: IDM[]
 */
export function listReadWorkSpaceDmsAPI(url: IListReadWorkSpaceDmsURL, query: IListReadWorkSpaceDmsHeaderQuery) {
  return `api/workspaces/${url.workspace}/dms/${url.mberId}/chats?perPage=${query.perPage}&page=${query.page}`;
}
