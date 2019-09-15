import axios from "axios";
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
} from "./types.js";
import { USER_SERVER, PRODUCT_SERVER } from "../../utils/misc";

export const loginUser = dataToSubmit => {
  const data = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(res => res.data);

  return {
    type: LOGIN_USER,
    payload: data
  };
};

export const registerUser = dataToSubmit => {
  const data = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(res => res.data);

  return {
    type: REGISTER_USER,
    payload: data
  };
};

export const authUser = () => {
  const data = axios.get(`${USER_SERVER}/auth`).then(res => res.data);

  return {
    type: AUTH_USER,
    payload: data
  };
};

export const logoutUser = () => {
  const data = axios.get(`${USER_SERVER}/logout`).then(res => res.data);

  return {
    type: LOGOUT_USER,
    payload: data
  };
};

export const addToBasket = id => {
  const data = axios
    .post(`${USER_SERVER}/add_to_basket?productId=${id}`)
    .then(res => res.data);

  return {
    type: ADD_TO_BASKET,
    payload: data
  };
};

export const removeFromBasket = id => {
  const data = axios
    .get(`${USER_SERVER}/remove_from_basket?productId=${id}`)
    .then(res => {
      res.data.cart.forEach(item => {
        res.data.cartData.forEach((d, i) => {
          if (item.id === d._id) {
            res.data.cartData[i].quantity = item.quantity;
          }
        });
      });
      return res.data;
    });

  return {
    type: REMOVE_FROM_BASKET,
    payload: data
  };
};

export const getBasketItems = (cartItems, userCart) => {
  const data = axios
    .get(`${PRODUCT_SERVER}/items_by_id?id=${cartItems}&type=array`)
    .then(res => {
      userCart.forEach(item => {
        res.data.forEach((d, i) => {
          if (item.id === d._id) {
            res.data[i].quantity = item.quantity;
          }
        });
      });
      return res.data;
    });

  return {
    type: GET_BASKET_ITEMS,
    payload: data
  };
};

export const onSuccessPurchase = purchaseData => {
  const data = axios
    .post(`${USER_SERVER}/success_purchase`, purchaseData)
    .then(res => res.data);

  return {
    type: ON_SUCCESS_PURCHASE,
    payload: data
  };
};

export const updateProfile = dataToSubmit => {
  const data = axios
    .post(`${USER_SERVER}/update_profile`, dataToSubmit)
    .then(res => res.data);

  return {
    type: UPDATE_USER_DATA,
    payload: data
  };
}

export const clearUserData = () => {
  return {
    type: CLEAR_USER_DATA
  }
}
