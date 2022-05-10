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
      console.log(action.payload);
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn } = authSlice.actions;

export default authSlice.reducer;
