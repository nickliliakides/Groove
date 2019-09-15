import axios from 'axios';
import { GET_SITE_INFO, UPDATE_SITE_INFO } from './types.js'
import { SITE_SERVER } from '../../utils/misc';

export const getSiteInfo = () => {
  const data = axios.get(`${SITE_SERVER}/site_data`).then(res => res.data);

  return {
    type: GET_SITE_INFO,
    payload: data
  }
 }

 export const updateSiteInfo = dataToSubmit => {
  const data = axios.post(`${SITE_SERVER}/site_data`, dataToSubmit).then(res => res.data);

  return {
    type: UPDATE_SITE_INFO,
    payload: data
  }
 }