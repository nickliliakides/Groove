import { combineReducers } from 'redux';
import user from './userReducer';
import product from './productReducer';
import site from './siteReducer';

const rootReducer = combineReducers({
  user,
  product,
  site
});

export default rootReducer;
