import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Video } from "../../models/Video";

interface InitialState {
  load: boolean;
  video: Video | null;
  error: string;
}

const initialState: InitialState = {
  load: true,
  video: null,
  error: "",
};

export const fetchPlayVideo = createAsyncThunk(
  "playVideo/fetchPlayVideo",
  async ({ id, token }: { id: string | undefined; token: string | null }) => {
    const response = await axios.get(
      `http://localhost:9000/api/v1/video/watching/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.video;
  }
);

export const subChannel = createAsyncThunk(
  "playVideo/subChannel",
  async ({ authorId, token }: { authorId: number; token: string | null }) => {
    await axios.post(
      `http://localhost:9000/api/v1/user/subChannel/${authorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
);

export const unSubChannel = createAsyncThunk(
  "playVideo/unSubChannel",
  async ({ authorId, token }: { authorId: number; token: string | null }) => {
    await axios.delete(
      `http://localhost:9000/api/v1/user/unSubChannel/${authorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
);

export const sub = createAsyncThunk(
  "playVideo/sub",
  async ({
    authorId,
    token,
    userCurrent,
  }: {
    authorId: number;
    token: string | null;
    userCurrent: number | null;
  }) => {
    const response = await axios.put(
      `http://localhost:9000/api/v1/user/sub/${authorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const unSub = createAsyncThunk(
  "playVideo/unSub",
  async ({
    authorId,
    token,
    userCurrent,
  }: {
    authorId: number;
    token: string | null;
    userCurrent: number | null;
  }) => {
    const response = await axios.put(
      `http://localhost:9000/api/v1/user/unSub/${authorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const likeVideo = createAsyncThunk(
  "playVideo/likeVideo",
  async ({
    id,
    token,
    userCurrent,
  }: {
    id: number;
    token: string | null;
    userCurrent: number | null;
  }) => {
    const response = await axios.put(
      `http://localhost:9000/api/v1/video/like/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const disLikeVideo = createAsyncThunk(
  "playVideo/disLikeVideo",
  async ({
    id,
    token,
    userCurrent,
  }: {
    id: number;
    token: string | null;
    userCurrent: number | null;
  }) => {
    const response = await axios.put(
      `http://localhost:9000/api/v1/video/disLike/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const unLikeVideo = createAsyncThunk(
  "playVideo/unLikeVideo",
  async ({
    id,
    token,
    userCurrent,
  }: {
    id: number;
    token: string | null;
    userCurrent: number | null;
  }) => {
    const response = await axios.put(
      `http://localhost:9000/api/v1/video/disLike/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const unDisLikeVideo = createAsyncThunk(
  "playVideo/unDisLikeVideo",
  async ({
    id,
    token,
    userCurrent,
  }: {
    id: number;
    token: string | null;
    userCurrent: number | null;
  }) => {
    const response = await axios.put(
      `http://localhost:9000/api/v1/video/unDisLike/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const slicePlayVideo = createSlice({
  name: "playVideo",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchPlayVideo.pending, (state) => {
      state.load = true;
    });
    build.addCase(
      fetchPlayVideo.fulfilled,
      (state, action: PayloadAction<Video>) => {
        state.load = false;
        state.video = action.payload;
        state.error = "";
      }
    );
    build.addCase(fetchPlayVideo.rejected, (state) => {
      state.load = false;
      state.video = null;
      state.error = "Error";
    });
    build.addCase(sub.fulfilled, (state, action) => {
      state.video?.author.subscribeUser.push(
        Number(action.meta.arg.userCurrent)
      );
    });
    build.addCase(unSub.fulfilled, (state, action) => {
      const indexUser = state.video?.author.subscribeUser.findIndex((item) => {
        return item === action.meta.arg.userCurrent;
      });
      state.video?.author.subscribeUser.splice(Number(indexUser), 1);
    });
    build.addCase(likeVideo.fulfilled, (state, action) => {
      state.video?.like.push(Number(action.meta.arg.userCurrent));
    });
    build.addCase(disLikeVideo.fulfilled, (state, action) => {
      state.video?.disLike.push(Number(action.meta.arg.userCurrent));
    });
    build.addCase(unLikeVideo.fulfilled, (state, action) => {
      const indexUser = state.video?.like.findIndex((item) => {
        return item === action.meta.arg.userCurrent;
      });
      state.video?.like.splice(Number(indexUser), 1);
    });
    build.addCase(unDisLikeVideo.fulfilled, (state, action) => {
      const indexUser = state.video?.disLike.findIndex((item) => {
        return item === action.meta.arg.userCurrent;
      });
      state.video?.disLike.splice(Number(indexUser), 1);
    });
  },
});

export default slicePlayVideo.reducer;
