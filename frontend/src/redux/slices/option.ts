import { createSlice } from "@reduxjs/toolkit";

interface Option {
  typeOption: string;
}

const initialState: Option = {
  typeOption: "Home",
};

const sliceOption = createSlice({
  name: "option",
  initialState: initialState,
  reducers: {
    home: (state) => {
      state.typeOption = "Home";
    },
    history: (state) => {
      state.typeOption = "History";
    },
    channelSelect: (state, action) => {
      state.typeOption = action.payload;
    },
  },
});

export const { home, history, channelSelect } = sliceOption.actions;

export default sliceOption.reducer;
