const queryInfoData = {
  /**
   * * 워크스페이스 내부에 멤버 초대 POST
   * * /api/workspaces/${workspace}/members
   */
  addWorkSpaceMember: {
    API(workspace: string) {
      return `/api/workspaces/${workspace}/members`;
    },
    method: 'post',
    bodyQuery: {
      email: '',
    },
  },

  /**
   * * 워크스페이스 내부에 멤버 목록 조회 GET
   * * /api/workspaces/{workspace}/members
   */
  listReadWorkSpaceMember: {
    API(workspace: string) {
      return `api/workspaces/${workspace}/members`;
    },
    method: 'get',
    bodyQuery: {},
  },

  /**
   * * 워크스페이스 에서 멤버 삭제 DELTETE
   * * /api/workspaces/{workspace}/members/{id}
   */
  removeWorkspaceMember: {
    API(workspace: string, mberId: string) {
      return `api/workspaces/${workspace}/members/${mberId}`;
    },
    method: 'delete',
    bodyQuery: {},
  },
};

export default queryInfoData;
