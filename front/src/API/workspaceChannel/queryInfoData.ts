const queryInfoData = {
  /**
   * * 워크스페이스 내부에 채널 생성 POST
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
   * * 워크스페이스 내부에 자신이 속해있는 채널 목록 조회 GET
   * * /api/workspaces/{workspace}/channels
   */
  listReadChannel: {
    API(workspace: string) {
      return `api/workspaces/${workspace}/channels`;
    },
    method: 'get',
    bodyQuery: {},
  },

  /**
   * * 워크스페이스 내부에 채널 조회 GET
   * * /api/workspaces/{workspace}/channels
   */
  readChannel: {
    API(workspace: string, channel: string) {
      return `api/workspaces/${workspace}/channels/${channel}`;
    },
    method: 'get',
    bodyQuery: {},
  },
};

export default queryInfoData;
