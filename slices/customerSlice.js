import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const slice = createSlice({
  name: "customer",
  initialState: {
    customer_id: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
  },
  reducers: {
    setCustomer: (
      state,
      { payload: { customer_id, fname, lname, email, phone } }
    ) => {
      state.customer_id = customer_id;
      state.fname = fname;
      state.lname = lname;
      state.email = email;
      state.phone = phone; // Fixed the duplicate email assignment issue
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = ""; // Clear all state properties
      });
    });
  },
});

export const { setCustomer } = slice.actions;
export default slice.reducer;
