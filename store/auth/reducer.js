import { actionTypes } from "./action";

export const initState = {
  isLoggedIn: false,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true, ...action.data.data },
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...initState,
      };
    default:
      return state;
  }
}

export default reducer;
