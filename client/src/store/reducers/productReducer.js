import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_FILTERED_PRODUCTS,
  GET_BRANDS,
  ADD_BRAND,
  REMOVE_BRAND,
  GET_WOODS,
  ADD_WOOD,
  REMOVE_WOOD,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_IMAGE,
  CLEAR_IMAGE,
  GET_PRODUCT_BY_ID,
  CLEAR_PRODUCT_DETAIL
} from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS_BY_SELL:
      return { ...state, itemsBySell: payload };
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, itemsByArrival: payload };
    case GET_FILTERED_PRODUCTS:
      return { ...state, items: payload.products, size: payload.size };
    case GET_BRANDS:
      return { ...state, brands: payload };
    case ADD_BRAND:
      return { ...state, addedBrand:payload.success, brands: payload.brands };
    case REMOVE_BRAND:
      return { ...state, removedBrand:payload.success, brands: state.brands.filter(b => b._id !== payload.brand._id) };
    case GET_WOODS:
      return { ...state, woods: payload };
    case ADD_WOOD:
      return { ...state, addedWood:payload.success, woods: payload.woods };
    case REMOVE_WOOD:
      return { ...state, removedWood:payload.success, woods: state.woods.filter(w => w._id !== payload.wood._id) };
    case ADD_PRODUCT:
      return { ...state, itemAdd: payload };
    case CLEAR_PRODUCT:
      return { ...state, itemAdd: {} };
    case GET_PRODUCT_BY_ID:
      return { ...state, item: payload };
    case CLEAR_PRODUCT_DETAIL:
      return { ...state, item: {} };
    case ADD_IMAGE:
      return { ...state, image: payload };
    case CLEAR_IMAGE:
      return { ...state, image: {} };
    default:
      return state;
  }
};
