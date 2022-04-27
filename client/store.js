import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers/index.js';
// createstore(reducers,devtools)
const store = configureStore({
  reducer: reducers,
});
export default store;
