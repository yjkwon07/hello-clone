const queryInfoData = {
  /**
   * * 자신의 워크스페이스 생성 POST
   * * /api/workspaces
   */
  addWorkSpace: {
    API() {
      return '/api/workspaces';
    },
    method: 'post',
    bodyQuery: {
      workspace: '',
      url: '',
    },
  },

  /**
   * * 자신의 워크스페이스 목록 조회 GET
   * * /api/workspaces
   */
  listReadWorkSpace: {
    API() {
      return '/api/workspaces';
    },
    method: 'get',
    bodyQuery: {},
  },
};

export default queryInfoData;
