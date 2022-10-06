export const actionTypes = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",

  DESTROY_SESSION: "DESTROY_SESSION",
};

export function login(data) {
  return { type: actionTypes.LOGIN_REQUEST, data };
}

export function loginSuccess(data) {
  return { type: actionTypes.LOGIN_SUCCESS, data };
}

export function logOut() {
  return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS };
}

export function destroySession() {
  return { type: actionTypes.DESTROY_SESSION };
}
