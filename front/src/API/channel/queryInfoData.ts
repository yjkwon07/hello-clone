const queryInfoData = {
  /**
   * * 채널 생성 POST
   * * /api/workspaces/{workspace}/channels
   */
  addChannel: {
    API(workspace: string) {
      return `api/workspaces/${workspace}/channels`;
    },
    method: 'post',
    bodyQuery: {
      workspace: '',
      url: '',
    },
  },

  /**
   * * 채널 조회 GET
   * * /api/workspaces/{workspace}/channels
   */
  readChannel: {
    API(workspace: string) {
      return `api/workspaces/${workspace}/channels`;
    },
    method: 'get',
    bodyQuery: {},
  },
};

export default queryInfoData;
