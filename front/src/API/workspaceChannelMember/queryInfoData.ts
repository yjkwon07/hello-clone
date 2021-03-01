const queryInfoData = {
  /**
   * * 워크스페이스 내부에 채널 멤버 초대 POST
   * * /api/workspaces/{workspace}/channels/{channel}/members
   */
  addChannelMember: {
    API(workspace: string, channel: string) {
      return `api/workspaces/${workspace}/channels/${channel}/members`;
    },
    method: 'post',
    bodyQuery: {
      email: '',
    },
  },

  /**
   * * 워크스페이스 내부에 채널 멤버 목록 조회 GET
   * * /api/workspaces/{workspace}/channels/{channel}/members
   */
  listReadChannelMember: {
    API(workspace: string, channel: string) {
      return `api/workspaces/${workspace}/channels/${channel}/members`;
    },
    method: 'get',
    bodyQuery: {},
  },
};

export default queryInfoData;
