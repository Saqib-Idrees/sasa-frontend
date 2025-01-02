import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.3acesoftware.com/auth/",
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
    createNote: builder.mutation({
      query: ({ orderId, notePayload }) => ({
        url: `orders/${orderId}/notes`,
        method: "POST",
        body: notePayload,
      }),
      invalidatesTags: (result, error, { orderId }) => [{ type: "Order", id: orderId }],
    }),
    getOrdersBySalesAgent: builder.query({
      query: (salesAgentId) => `orders/sales-agent/${salesAgentId}`,
    }),
    getOrderByOrderId: builder.query({
      query: (orderId) => `orders/${orderId}`,
      providesTags: (result, error, orderId) => [{ type: "Order", id: orderId }],
    }),
  }),
});

// Export the hooks for usage in components
export const { useCreateOrderMutation, useCreateNoteMutation, useGetOrdersBySalesAgentQuery, useGetOrderByOrderIdQuery } =
  ordersApi;
