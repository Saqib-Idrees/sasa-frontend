import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const typesApi = createApi({
  reducerPath: "typesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4001/auth/",
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
    getAllTypes: builder.query({
      query: () => ({
        url: "types/allTypes",
        method: "GET",
      }),
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const { useGetAllTypesQuery } = typesApi;
