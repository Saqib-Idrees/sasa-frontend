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
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
      ],
    }),
    getOrdersBySalesAgent: builder.query({
      query: (salesAgentId) => `orders/sales-agent/${salesAgentId}`,
    }),
    getOrderByOrderId: builder.query({
      query: (orderId) => `orders/${orderId}`,
      providesTags: (result, error, orderId) => [
        { type: "Order", id: orderId },
      ],
    }),
    updateQuotation: builder.mutation({
      query({ orderId, values }) {
        return {
          url: `orders/quotation/${orderId}`,
          method: "PUT",
          body: values,
        };
      },
    }),
    approveQuotation: builder.mutation({
      query({ orderId }) {
        return {
          url: `orders/approve-quotation`,
          method: "POST",
          body: { orderId: orderId },
        };
      },
    }),
    disapproveQuotation: builder.mutation({
      query({ orderId }) {
        return {
          url: `orders/disapprove-quotation`,
          method: "POST",
          body: { orderId: orderId },
        };
      },
    }),
    addTracking: builder.mutation({
      query(payload) {
        return {
          url: `orders/update-tracking`,
          method: "POST",
          body: payload,
        };
      },
    }),
    updateStatus: builder.mutation({
      query({ orderId, newStatus }) {
        return {
          url: `orders/update-status/${orderId}`,
          method: "PUT",
          body: {newStatus: newStatus},
        };
      },
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
      ],
    }),
    updateBalance: builder.mutation({
      query({ orderId, newBalance }) {
        return {
          url: `orders/update-balance/${orderId}`,
          method: "PUT",
          body: {newBalance: newBalance},
        };
      },
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
      ],
    }),
  }),
  
});

export const {
  useCreateOrderMutation,
  useCreateNoteMutation,
  useGetOrdersBySalesAgentQuery,
  useGetOrderByOrderIdQuery,
  useUpdateQuotationMutation,
  useApproveQuotationMutation,
  useDisapproveQuotationMutation,
  useAddTrackingMutation,
  useUpdateStatusMutation,
  useUpdateBalanceMutation
} = ordersApi;
