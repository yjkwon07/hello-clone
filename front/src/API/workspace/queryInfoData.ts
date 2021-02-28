const queryInfoData = {
  /**
   * * 워크스페이스 생성 POST
   * * /api/users
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
};

export default queryInfoData;
