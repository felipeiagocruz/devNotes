import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import collectionsSlice from "./collectionsSlice";

export default configureStore({
  reducer: { authSlice: authSlice, collectionsSlice: collectionsSlice },
});
