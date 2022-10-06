import { combineReducers } from "redux";
import { actionTypes } from "./auth/action";
import post from "./post/reducer";
import product from "./product/reducer";
import setting from "./setting/reducer";
import cart from "./cart/reducer";
import compare from "./compare/reducer";
import auth from "./auth/reducer";
import wishlist from "./wishlist/reducer";
import collection from "./collection/reducer";
import media from "./media/reducer";
import app from "./app/reducer";
import home from "./home/reducer";
import account from "./account/reducer";

const appReducer = combineReducers({
  auth,
  post,
  product,
  setting,
  cart,
  compare,
  wishlist,
  collection,
  media,
  app,
  home,
  account,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.DESTROY_SESSION) {
    state.account = undefined;
    state.auth = undefined;
    state.wishlist = undefined;
    state.cart = undefined;
    localStorage.removeItem("persist:Kangtao");
    localStorage.removeItem("user");
    localStorage.removeItem("seller_chat_id");
    localStorage.removeItem("order");
  }

  return appReducer(state, action);
};

export default rootReducer;
