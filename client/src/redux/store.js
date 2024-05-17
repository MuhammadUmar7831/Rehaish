import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user.slice.js';
import loadingReducer from './slices/loading.slice.js';

export default configureStore({
  reducer: {user: userReducer, loading: loadingReducer},
  middleware: (getDefaultMiddleware)=>{
    return getDefaultMiddleware({
      serializableCheck: false
    }) 
  }
})