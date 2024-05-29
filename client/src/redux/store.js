import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice.js";
import loadingReducer from "./slices/loading.slice.js";
import selectedListingReducer from "./slices/selectedListing.slice.js";

export default configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    selectedListing: selectedListingReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
