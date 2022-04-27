import * as types from '../constants/actionTypes';

const initialState = {
  cartList: [],
  cartTotal: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART: {
      return {
        ...state,
      };
    }
  }
};
