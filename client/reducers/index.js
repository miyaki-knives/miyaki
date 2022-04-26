import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

const reducers = combineReducers({
  cartStatus: cartReducer,
});

export default reducers;
