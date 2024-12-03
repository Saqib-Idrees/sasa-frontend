import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'profile',
  initialState: {
    displayname: "",
    firstname: "",
    lastname: "",
    bio: ""
  },
  reducers: {
    setProfileInfo: (state, {payload: { displayname, firstname, lastname, bio }}) => {
      state.displayname = displayname
      state.firstname = firstname
      state.lastname = lastname
      state.bio = bio
    },
    // setAuthenticated: (state) => {
    //   state.isAuthenticated = true
    // },
    // setLogout: (state) => {
    //   state.user = null
    //   state.isAuthenticated = false
    //   state.access = null
    //   state.refresh = null
    // }
  },
})


export const { 
  setProfileInfo,
  setUser
} = slice.actions
export default slice.reducer