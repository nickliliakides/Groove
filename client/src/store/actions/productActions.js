import axios from 'axios';
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
  REMOVE_IMAGE,
  GET_PRODUCT_BY_ID,
  CLEAR_PRODUCT_DETAIL
 } from './types.js'
 import { PRODUCT_SERVER } from '../../utils/misc';

 export const getProductsByArrival = () => {
  const data = axios.get(`${PRODUCT_SERVER}/items?sortBy=createdAt&order=desc&limit=4`).then(res => res.data);

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: data
  }
 }

 export const getProductsBySell = () => {
  const data = axios.get(`${PRODUCT_SERVER}/items?sortBy=sold&order=desc&limit=4`).then(res => res.data);

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: data
  }
}

export const getFilteredProducts = (limit, skip, filters = [], prevState = []) => {
  const body = { limit, skip, filters }

  const data = axios.post(`${PRODUCT_SERVER}/shop`, body).then(res => {
    let newState =[
      ...prevState,
      ...res.data.products
    ]

    return {
      size: res.data.size,
      products: newState
    }
  });

  return {
    type: GET_FILTERED_PRODUCTS,
    payload: data
  }
}

export const getBrands = () => {
  const data = axios.get(`${PRODUCT_SERVER}/brands`).then(res => res.data);

  return {
    type: GET_BRANDS,
    payload: data
  }
}

export const addBrand = (dataToSubmit, existingBrands) => {
  const data = axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit).then(res => {
    let brands = [...existingBrands, res.data.brand];
    return {
      success: res.data.success,
      brands
    }
  });

  return {
    type: ADD_BRAND,
    payload: data
  }
}

export const removeBrand = brandId => {

  const data = axios.delete(`${PRODUCT_SERVER}/brand?id=${brandId}`).then(res => res.data);

  return {
    type: REMOVE_BRAND,
    payload: data
  }
}

export const getWoods = () => {
  const data = axios.get(`${PRODUCT_SERVER}/woods`).then(res => res.data);

  return {
    type: GET_WOODS,
    payload: data
  }
}

export const addWood = (dataToSubmit, existingWoods) => {
  const data = axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit).then(res => {
    let woods = [...existingWoods, res.data.wood];
    return {
      success: res.data.success,
      woods
    }
  });

  return {
    type: ADD_WOOD,
    payload: data
  }
}

export const removeWood = woodId => {

  const data = axios.delete(`${PRODUCT_SERVER}/wood?id=${woodId}`).then(res => res.data);

  return {
    type: REMOVE_WOOD,
    payload: data
  }
}

export const addProduct = dataToSubmit => {
  const data = axios.post(`${PRODUCT_SERVER}/item`,dataToSubmit).then(res => res.data);

  return {
    type: ADD_PRODUCT,
    payload: data
  }
}

export const clearProduct = () => {

  return {
    type: CLEAR_PRODUCT
  }
}

export const addImage = file => {
  let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    };
    formData.append('file', file);

  const data = axios.post(`${PRODUCT_SERVER}/upload_image`, formData, config).then(res => res.data);

  return {
    type: ADD_IMAGE,
    payload: data
  }
}

export const clearImage = () => {

  return {
    type: CLEAR_IMAGE
  }
}

export const removeImage = imgId => {

  const data = axios.get(`${PRODUCT_SERVER}/remove_image?public_id=${imgId}`).then(res => res.data);

  return {
    type: REMOVE_IMAGE,
    payload: data
  }
}

export const getProductById = id => {
   
  const data = axios.get(`${PRODUCT_SERVER}/items_by_id?id=${id}&type=single`).then(res => res.data[0]);

  return {
    type: GET_PRODUCT_BY_ID,
    payload: data
  }
}

export const clearProductDetail = () => {

  return {
    type: CLEAR_PRODUCT_DETAIL
  }
}

