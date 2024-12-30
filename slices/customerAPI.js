import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.3acesoftware.com/auth/",
    prepareHeaders: (headers, { getState }) => {
      const isAuthenticated = getState().auth.isAuthenticated;
      const token = getState().auth.token;
      const user = getState().auth.user;
      const access = getState().auth.access;
      if (token && isAuthenticated && user && access) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCustomerByEmail: builder.query({
      query: (email) => ({
        url: "customers/findByEmail",
        method: "POST",
        body: { email },
      }),
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const {
  useGetCustomerByEmailQuery,
} = customerApi;
