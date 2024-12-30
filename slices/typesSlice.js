import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  types: [],
};

// Create slice
const typesSlice = createSlice({
  name: "types",
  initialState,
  reducers: {
    setTypes: (state, action) => {
      state.types = action.payload;
    },
  },
});

// Export actions
export const { setTypes } = typesSlice.actions;

export default typesSlice.reducer;
