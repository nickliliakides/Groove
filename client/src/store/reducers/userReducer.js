import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  GET_BASKET_ITEMS,
  ON_SUCCESS_PURCHASE,
  UPDATE_USER_DATA,
  CLEAR_USER_DATA
} from "../actions/types";

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: payload };
    case REGISTER_USER:
      return { ...state, register: payload };
    case AUTH_USER:
      return { ...state, userData: payload };
    case LOGOUT_USER:
      return { ...state, cartData: [] };
    case ADD_TO_BASKET:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: payload
        }
      };
    case REMOVE_FROM_BASKET:
      return {
        ...state,
        cartData: payload.cartData,
        userData: {
          ...state.userData,
          cart: payload.cart
        }
      };
    case GET_BASKET_ITEMS:
      return { ...state, cartData: payload };
    case ON_SUCCESS_PURCHASE:
      return {
        ...state,
        purchaseSuccess: payload.success,
        userData: {
          ...state.userData,
          cart: payload.cart
        },
        cartData: payload.cartData
      };
    case UPDATE_USER_DATA:
      return { ...state, updateProfile: payload }
    case CLEAR_USER_DATA:
      return { ...state, updateProfile: {} }
    default:
      return state;
  }
};
