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
   * * /api/users/login
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
   * * 로그아웃 POST
   * * /api/users/logout
   */
  logout: {
    API() {
      return '/api/users/logout';
    },
    method: 'post',
    bodyQuery: {},
  },

  /**
   * * 유저 정보 조회 GET
   * * /api/users
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
