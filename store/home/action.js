export const actionTypes = {
  GET_HOME_DATA: "GET_HOME_DATA",
  GET_HOME_SUCCESS: "GET_HOME_SUCCESS",
  GET_HOME_ERROR: "GET_HOME_ERROR",
};

export function getHomeData(payload) {
  return { type: actionTypes.GET_HOME_DATA, payload };
}

export function getHomeSuccess(data) {
  return {
    type: actionTypes.GET_HOME_SUCCESS,
    data,
  };
}

export function getHomeError(error) {
  return {
    type: actionTypes.GET_HOME_ERROR,
    error,
  };
}
