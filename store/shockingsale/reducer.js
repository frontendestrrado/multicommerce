import { actionTypes } from "./action";

export const initProduct = {
  shockingsaleproducts: [],
};

function reducer(state = initProduct, action) {
  switch (action.type) {
    case actionTypes.ADD_PRODUCTS:
      return {
        ...state,
        ...{ shockingsaleproducts: action.payload.products },
      };
    default:
      return state;
  }
}

export default reducer;
