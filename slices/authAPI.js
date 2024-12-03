import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PURGE } from "redux-persist";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://3.82.112.137:4001/auth/",
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
    userCreate: builder.mutation({
      query(data) {
        const {
          firstname,
          lastname,
          username,
          email,
          password,
          re_password,
          role,
          phone,
          dob,
          gender,
          shopName,
          location,
        } = data;
        return {
          url: "auth/register",
          method: "POST",
          body: {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: `${email}`,
            password: `${password}`,
            re_password: `${re_password}`,
            role: role,
            phone: parseInt(phone) || null,
            dob: dob || null,
            gender: gender || null,
            shopName: shopName || null,
            location: location || null,
          },
        };
      },
    }),
    userActivate: builder.mutation({
      query(data) {
        const { uid, token } = data;
        return {
          url: `users/activation/`,
          // url: `users/activate/${uid}/${token}`,
          method: "POST",
          body: {
            uid: `${uid}`,
            token: `${token}`,
          },
        };
      },
    }),
    resendActivationEmail: builder.mutation({
      query(data) {
        const { email } = data;
        return {
          url: "/users/resend_activation/",
          method: "POST",
          body: {
            email: `${email}`,
          },
          // body: JSON.stringify({ email })
        };
      },
    }),
    resetPassword: builder.mutation({
      query(data) {
        const { email } = data;
        return {
          url: "users/reset_password/",
          method: "POST",
          body: {
            email: `${email}`,
          },
        };
      },
    }),
    resetPasswordConfirm: builder.mutation({
      query(data) {
        const { uid, token, new_password, re_new_password } = data;
        // console.log('################')
        // console.log(typeof(data))
        return {
          url: "users/reset_password_confirm/",
          method: "POST",
          body: { uid, token, new_password, re_new_password },
        };
      },
    }),
    loginUser: builder.mutation({
      query(data) {
        const { email, password } = data;
        console.log(email, password);
        return {
          url: "auth/login/",
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: {
            email: `${email}`,
            password: `${password}`,
          },
        };
      },
    }),
    googleLogin: builder.query({
      // transformResponse: (response) => response.data,
      query() {
        // const { redirect_uri } = data
        const redirect_uri = "http://localhost:8000/google";
        return {
          url: "o/google-oauth2/?redirect_uri=http://localhost:8000/google",
          method: "GET",
          body: {
            redirect_uri: `${redirect_uri}`,
          },
        };
      },
    }),
    googleAuth: builder.mutation({
      query(data) {
        const { code, state } = data;
        const details = {
          state: state,
          code: code,
        };
        const formData = Object.keys(details)
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
          )
          .join("&");
        return {
          url: `o/google-oauth2/?${formData}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
          // body: {}
        };
      },
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
    }),
  }),
});

// format to generate hook for specific api endpoint query:
// for POST/PUT/PATCH/DELETE requests:
//    use<nameOfQuery>Mutation
// for GET requests:
//    use<nameOfQuery>Query
export const {
  useUserCreateMutation,
  useUserActivateMutation,
  useResendActivationEmailMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useLoginUserMutation,
  useGoogleLoginQuery,
  useGoogleAuthMutation,
  useGetAllUsersQuery,
  useLoadUserQuery,
} = authApi;
