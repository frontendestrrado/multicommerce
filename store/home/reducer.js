import { actionTypes } from "./action";

export const initialState = {
  homedata: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_HOME_SUCCESS:
      return {
        ...state,
        ...{ homedata: action.data },
      };
    case actionTypes.GET_HOME_ERROR:
      return {
        ...state,
        ...{ error: action.error },
      };

    default:
      return state;
  }
}

export default reducer;
