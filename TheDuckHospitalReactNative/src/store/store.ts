import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import refreshListReducer from './refreshListSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    refreshList: refreshListReducer,
  },
});

export default store;
