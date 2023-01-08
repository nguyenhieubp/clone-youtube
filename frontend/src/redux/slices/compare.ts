import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Channel {
  _id: number | null;
  avatar: string;
  name: string;
}

interface InitialStateListChannel {
  channel: Array<Channel>;
}

const initialStateChannel: InitialStateListChannel = {
  channel: [],
};

export const fetchUserSub = createAsyncThunk(
  "compare/fetchUserSub",
  async ({ id, token }: { id: number; token: string | null }) => {
    const response = await axios.get(
      `http://localhost:9000/api/v1/user/listSub/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchUserLikeVideo = createAsyncThunk(
  "compare/fetchUserLikeVideo",
  async ({ idVideo, token }: { idVideo: number; token: string | null }) => {
    const response = await axios.get(
      `http://localhost:9000/api/v1/video/listLike/${idVideo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchUserDisLikeVideo = createAsyncThunk(
  "compare/fetchUserDisLikeVideo",
  async ({ idVideo, token }: { idVideo: number; token: string | null }) => {
    const response = await axios.get(
      `http://localhost:9000/api/v1/video/listDisLike/${idVideo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchChannelFlow = createAsyncThunk(
  "compare/fetchChannelFlow",
  async ({ token }: { token: string | null }) => {
    const response = await axios.get(
      `http://localhost:9000/api/v1/user/listChannelSub`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    listUserSub: [],
    listUserLike: [],
    listUserDisLike: [],
    listChannel: initialStateChannel,
  },
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      fetchUserSub.fulfilled,
      (state, action: PayloadAction<[]>) => {
        state.listUserSub = action.payload;
      }
    );
    build.addCase(
      fetchUserLikeVideo.fulfilled,
      (state, action: PayloadAction<[]>) => {
        state.listUserLike = action.payload;
      }
    );
    build.addCase(
      fetchUserDisLikeVideo.fulfilled,
      (state, action: PayloadAction<[]>) => {
        state.listUserDisLike = action.payload;
      }
    );
    build.addCase(
      fetchChannelFlow.fulfilled,
      (state, action: PayloadAction<Channel[]>) => {
        state.listChannel.channel = action.payload;
      }
    );
  },
});

export default compareSlice.reducer;
