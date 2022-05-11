import { createSlice } from "@reduxjs/toolkit";

type Colletion = {
  id: string;
  collectionName: string;
  notations: {
    id: string;
    img: string;
    url: string;
    notation: string;
  }[];
};

export const collectionSlice = createSlice({
  name: "collectionsSlice",
  initialState: {
    collections: [] as Colletion[],
  },
  reducers: {
    loadCollection: (state, action) => {
      state.collections = action.payload;
    },
    editColletion: (state, action) => {
      let teste = state.collections.find(
        (colection) => colection.id === action.payload.id
      );
      teste = {
        id: teste!.id,
        collectionName: teste!.collectionName,
        notations: [action.payload.notations],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const collectionsActions = collectionSlice.actions;

export default collectionSlice.reducer;
