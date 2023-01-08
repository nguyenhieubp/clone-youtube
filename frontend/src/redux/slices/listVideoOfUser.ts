import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Video } from "../../models/Video";
interface InitialState {
  videos: Array<Video>;
}

interface InitialState {
  videos: Array<Video>;
}

interface FormUpdate {
  title: string;
  desc: string;
}

const initialState: InitialState = {
  videos: [],
};

export const fetchVideoOfUser = createAsyncThunk(
  "videoOfUer/fetchVideoOfUser",
  async ({ userId }: { userId: string | undefined }) => {
    const response = await axios.get(
      `http://localhost:9000/api/v1/user/listVideo/${userId}`
    );
    return response.data.video;
  }
);

export const updateVideo = createAsyncThunk(
  "videoOfUer/updateVideo",
  async ({
    id,
    token,
    valueVideoUpdate,
  }: {
    id: number | null;
    token: string | null;
    valueVideoUpdate: FormUpdate;
  }) => {
    const response = await axios.put(
      `http://localhost:9000/api/v1/video/${id}`,
      {
        title: valueVideoUpdate.title,
        desc: valueVideoUpdate.desc,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.video;
  }
);

export const deleteVideo = createAsyncThunk(
  "videoOfUer/deleteVideo",
  async ({ id, token }: { id: number | null; token: string | null }) => {
    const response = await axios.delete(
      `http://localhost:9000/api/v1/video/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const sliceVideoOfUser = createSlice({
  name: "videoOfUer",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      fetchVideoOfUser.fulfilled,
      (state, action: PayloadAction<Video[]>) => {
        state.videos = action.payload;
      }
    );
    build.addCase(
      updateVideo.fulfilled,
      (state, action: PayloadAction<Video>) => {
        state.videos = state.videos.map((video) => {
          return video._id === action.payload._id
            ? { ...action.payload }
            : video;
        });
      }
    );
    build.addCase(deleteVideo.fulfilled, (state, action) => {
      const indexVideo = state.videos.findIndex((video) => {
        return video._id === action.meta.arg.id;
      });
      state.videos.splice(indexVideo, 1);
    });
  },
});

export default sliceVideoOfUser.reducer;
