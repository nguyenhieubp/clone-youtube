import React from "react";
import Index from "../components/watchVideo/Index";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/config/hooks";
import { fetchPlayVideo } from "../redux/slices/playVideo";
const Watch: React.FC = () => {
  const token = localStorage.getItem("accessToken");
  const dispatch = useAppDispatch();
  const { video } = useParams();
  React.useEffect(() => {
    dispatch(fetchPlayVideo({ id: video, token: token }));
  }, [dispatch, token, video]);
  return <Index></Index>;
};

export default Watch;
