import { Video } from "../../models/Video";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  videos: Array<Video>;
}

const initialState: InitialState = {
  videos: [],
};

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const response = await axios.get("http://localhost:9000/api/v1/video");
  return response.data;
});

const sliceFetchVideos = createSlice({
  name: "videos",
  initialState,
  reducers: {
    addVideo: (state, action: PayloadAction<Video>) => {
      state.videos.push(action.payload);
    },
  },
  extraReducers: (build) => {
    build.addCase(
      fetchVideos.fulfilled,
      (state, action: PayloadAction<Video[]>) => {
        state.videos = action.payload;
      }
    );
  },
});

export const { addVideo } = sliceFetchVideos.actions;

export default sliceFetchVideos.reducer;
