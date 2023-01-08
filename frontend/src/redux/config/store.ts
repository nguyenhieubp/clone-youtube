import { configureStore } from "@reduxjs/toolkit";
import option from "../slices/option";
import currentUser from "../slices/currentUser";
import videos from "../slices/Videos";
import videoOfUser from "../slices/listVideoOfUser";
import playVideo from "../slices/playVideo";
import historyVideo from "../slices/videoHistory";
import compare from "../slices/compare";
const store = configureStore({
  reducer: {
    option,
    currentUser,
    videos,
    videoOfUser,
    playVideo,
    historyVideo,
    compare,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
