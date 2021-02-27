const queryInfoData = {
  /**
   * * 회원가입 POST
   * * /api/users
   */
  signup: {
    API() {
      return '/api/users';
    },
    method: 'post',
    bodyQuery: {
      email: '',
      nickname: '',
      password: '',
    },
  },

  /**
   * * 로그인 POST
   * * /api/login
   */
  login: {
    API() {
      return '/api/users/login';
    },
    method: 'post',
    bodyQuery: {
      email: '',
      password: '',
    },
  },

  /**
   * * 유저 정보 조회 GET
   * * /api/login
   */
  user: {
    API() {
      return '/api/users';
    },
    method: 'get',
    bodyQuery: {},
  },
};

export default queryInfoData;
