import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["UserById"],
  endpoints: (builder) => ({
    getProfileByEmail: builder.query({
      query: (email) => `${email}`,
    }),
    updateProfile: builder.mutation({
      query(data) {
        const {
          firstname,
          lastname,
          username,
          email,
          role,
          phone,
          dob,
          gender,
          shopName,
          location,
        } = data;
        debugger;
        return {
          url: `users/update/profile`,
          method: "PATCH",
          body: {
            firstname: firstname,
            lastname: lastname,
            username: username,
            phone: phone,
            dob: dob,
            gender: gender,
            shopName: shopName,
            location: location
          },
        };
      },
    }),
    getAllProfiles: builder.query({
      query: () => `users`,
    }),
    getProfileById: builder.query({
      query: (id) => `users/profile/${id}`,
      providesTags: (result, error, id) => [{ type: 'UserById', id }],
    }),
    updateProfileById: builder.mutation({
      query(data) {
        const {
          id,
          firstname,
          lastname,
          username,
          email,
          role,
          phone,
          dob,
          gender,
          shopName,
          location,
        } = data;
        return {
          url: `users/update/profile/${id}`,
          method: "PATCH",
          body: {
            firstname: firstname,
            lastname: lastname,
            username: username,
            phone: phone,
            dob: dob,
            gender: gender,
            shopName: shopName,
            location: location
          },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "UserById", id }], // Invalidate the tag for this user
    }),
  }),
  refetchOnMountOrArgChange: true,
});

// format to generate hook for specific api endpoint query:
// for POST/PUT/PATCH/DELETE requests:
//    use<nameOfQuery>Mutation
// for GET requests:
//    use<nameOfQuery>Query
export const {
  useGetProfileByEmailQuery,
  useUpdateProfileMutation,
  useGetAllProfilesQuery,
  useGetProfileByIdQuery,
  useUpdateProfileByIdMutation
} = profileApi;
