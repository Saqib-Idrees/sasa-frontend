import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "order",
  initialState: {
    orderStatus: 'all',
  },
  reducers: {
    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    }
  }
});

export const {
  setOrderStatus,
} = slice.actions;

export default slice.reducer;
export const selectCurrentOrderStatus = (state) => state.order.orderStatus;
