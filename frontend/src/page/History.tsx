import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/home/Header";
import SideBar from "../components/home/SideBar";
import { Video } from "../models/Video";
import { useAppDispatch, useAppSelector } from "../redux/config/hooks";
import { fetchPlayVideo } from "../redux/slices/playVideo";
import { fetchVideoHistory } from "../redux/slices/videoHistory";
import "../styles/index.css";

const History: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken");
  const { video } = useParams();

  React.useEffect(() => {
    dispatch(fetchVideoHistory({ token }));
  }, [dispatch, token]);

  const { videos } = useAppSelector((state) => state.historyVideo);

  React.useEffect(() => {
    dispatch(fetchPlayVideo({ id: video, token: token }));
  }, [dispatch, token, video]);

  return (
    <div className="grid grid-cols-7">
      <div className="col-span-1 p-[2rem]">
        <SideBar></SideBar>
      </div>
      <div className="col-span-6">
        <Header></Header>
        <div className="mt-[10rem] px-[3rem]">
          <div className="font-bold text-[3rem]">History</div>
          <div className="w-[70rem]">
            {videos
              // eslint-disable-next-line array-callback-return
              ?.filter((video) => {
                if (video !== null) {
                  return video;
                }
              })
              .map((video: Video) => (
                <Link
                  to={`/watch/${video._id}`}
                  className="flex w-[50rem]  my-[3rem] cursor-pointer"
                >
                  <div className="w-full h-[15rem]  ">
                    <img
                      className="w-full h-full object-cover rounded-[2rem] object-center"
                      src={video.image}
                      alt=""
                    />
                  </div>
                  <div className="ml-[2rem] w-[30rem]">
                    <div className="font-bold text-[2rem] title-video-relate">
                      {video.title}
                    </div>
                    <div className="my-[2rem]">{video.author.name}</div>
                    <div className="title-video-relate">{video.desc}</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
