import {
  IAddWorkSpaceMemberURL,
  IListReadWorkSpaceMemberURL,
  IReadWorkSpaceMemberURL,
  IRemoveWorkSpaceMemberURL,
} from './type';

/**
 * * :workspace로 멤버 초대 POST
 * * api/workspaces/${workspace}/members
 * * return 'ok'
 */
export function GET_ADD_WORKSPACE_MEMBER_API(url: IAddWorkSpaceMemberURL) {
  return `api/workspaces/${url.workspace}/members`;
}

/**
 * * :workspace 내부의 멤버 목록을 가져옴 GET
 * * /api/workspaces/{workspace}/members
 * * return IUser[]
 */
export function GET_LIST_READ_WORKSPACE_MEMBER_API(url: IListReadWorkSpaceMemberURL) {
  return `api/workspaces/${url.workspace}/members`;
}

/**
 * * :workspace의 멤버인 특정 :id 사용자 정보를 가져옴 GET
 * * /workspaces/{workspace}/users/{mberId}
 * * return IUser
 */
export function GET_READ_WORKSPACE_MEMBER_API(url: IReadWorkSpaceMemberURL) {
  return `api/workspaces/${url.workspace}/users/${url.mberId}`;
}

/**
 * * :workspace에서 :id 멤버 제거(또는 탈퇴) DELTETE
 * * /api/workspaces/{workspace}/members/{id}
 * * return 'ok'
 */
export function GET_REMOVE_WORKSPACE_MEMBER_API(url: IRemoveWorkSpaceMemberURL) {
  return `api/workspaces/${url.workspace}/members/${url.mberId}`;
}
