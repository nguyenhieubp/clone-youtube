import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Video } from "../../models/Video";

interface InitialState {
  load: boolean;
  videos: Video[];
  error: string;
}

const initialState: InitialState = {
  load: true,
  videos: [],
  error: "",
};

export const fetchVideoHistory = createAsyncThunk(
  "playVideo/fetchVideoHistory",
  async ({ token }: { token: string | null }) => {
    const response = await axios.get(
      `http://localhost:9000/api/v1/user/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const sliceVideoHistory = createSlice({
  name: "playVideo",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchVideoHistory.pending, (state) => {
      state.load = true;
    });
    build.addCase(
      fetchVideoHistory.fulfilled,
      (state, action: PayloadAction<Video[]>) => {
        state.load = false;
        state.videos = action.payload;
        state.error = "";
      }
    );
    build.addCase(fetchVideoHistory.rejected, (state) => {
      state.load = false;
      state.videos = [];
      state.error = "Error";
    });
  },
});

export default sliceVideoHistory.reducer;
