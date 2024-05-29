import { createSlice } from "@reduxjs/toolkit";

export const selectedListingSlice = createSlice({
  name: "selectedListing",
  initialState: {
    selectedListing: {},
  },
  reducers: {
    setSelectedListing: (state, action)=>{
        state.selectedListing = action.payload;
    }
  }
});

export const { setSelectedListing } = selectedListingSlice.actions;

export default selectedListingSlice.reducer;
