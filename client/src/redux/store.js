import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user.slice.js';

export default configureStore({
  reducer: {reducer: userReducer},
  middleware: (getDefaultMiddleware)=>{
    return getDefaultMiddleware({
      serializableCheck: false
    }) 
  }
})