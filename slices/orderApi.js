import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4001/auth/",
    prepareHeaders: (headers, { getState }) => {
      const isAuthenticated = getState().auth.isAuthenticated;
      const token = getState().auth.token;
      const user = getState().auth.user;
      const access = getState().auth.access;
      if (token && isAuthenticated && user && access) {
        console.log(token);
        debugger;
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");
      } else {
        headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "orders/create-order",
        method: "POST",
        body: payload.orderPayload,
      }),
    }),
  }),
});

// Export the hooks for usage in components
export const { useCreateOrderMutation } = ordersApi;
