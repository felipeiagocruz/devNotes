import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: {
      displayName: null,
      email: null,
      photo: null,
      uid: null,
      token: null,
    },
  },
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = {
        displayName: null,
        email: null,
        photo: null,
        uid: null,
        token: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export default authSlice.reducer;
