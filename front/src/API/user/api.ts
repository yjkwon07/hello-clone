/**
 * * 회원가입 POST
 * * /api/users
 * * return 'ok'
 */
export function GET_SIGNUP_API() {
  return '/api/users';
}

/**
 * * 로그인 POST
 * * /api/users/login
 * * return: IUser
 */
export function GET_LOGIN_API() {
  return '/api/users/login';
}

/**
 * * 로그아웃 POST
 * * /api/users/logout
 * * return 'ok'
 */
export function GET_LOGOUT_API() {
  return '/api/users/logout';
}

/**
 * * 내 로그인 정보를 가져옴 GET
 * * /api/users
 * * return: IUser, 로그인되어있지 않으면 false
 */
export function GET_USER_API() {
  return '/api/users';
}
