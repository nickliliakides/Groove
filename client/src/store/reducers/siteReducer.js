import { GET_SITE_INFO, UPDATE_SITE_INFO } from '../actions/types';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SITE_INFO:
      return { ...state, siteInfo: payload }
    case UPDATE_SITE_INFO:
      return { ...state, siteInfo: payload.siteInfo }
    default:
      return state;
  }
};