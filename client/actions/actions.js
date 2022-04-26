import * as types from '../constants/actionTypes';

export const addToCartActionCreator = (userId) => {
  return {
    type: types.ADD_TO_CART,
    payload: userId,
  };
};

export const deleteFromCartActionCreator = (userId) => {
  return {
    type: types.DELETE_FROM_CART,
    payload: userId,
  };
};
