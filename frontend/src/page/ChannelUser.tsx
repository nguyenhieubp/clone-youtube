import React from "react";
import Header from "../components/home/Header";
import SideBar from "../components/home/SideBar";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/config/hooks";
import { fetchVideoOfUser } from "../redux/slices/listVideoOfUser";
import { useLocation } from "react-router-dom";
const ChannelUser = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchVideoOfUser({ userId: location.state._id }));
  }, [dispatch, location.state._id]);

  const { videos } = useAppSelector((state) => state.videoOfUser);

  return (
    <div className="grid grid-cols-7">
      <div className="col-span-1 p-[2rem]">
        <SideBar></SideBar>
      </div>
      <div className="col-span-6">
        <Header></Header>
        <div className="mt-[12rem]">
          <div className="flex items-end px-[3rem]">
            <div className="font-bold text-[4rem]">{location.state.name}</div>
            <div className="w-[10rem] h-[10rem]  ml-[4rem]">
              <img
                className="w-full h-full object-cover rounded-full"
                src={location.state.avatar}
                alt=""
              />
            </div>
          </div>
          <hr className="mt-[4rem]" />
          <div className="grid grid-cols-4">
            {videos.map((video) => (
              <Link to={`/watch/${video._id}`}>
                <div className="w-[30rem] h-[18rem] mb-[10rem] p-[1rem] cursor-pointer ">
                  <div className="w-full h-full ">
                    <img
                      className="w-full h-full rounded-[1rem]"
                      src={video.image}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col p-[1rem]">
                    <div className="title-video-relate ">{video.desc}</div>
                    <div className="mt-[1rem]">
                      <div className="text-[#888888] overflow-hidden line-clamp-3 ">
                        {video.author.name}
                      </div>
                      <div className="flex  items-center mt-[1rem]">
                        <div className="text-[#888888]">{video.view} views</div>
                        <div className="text-[#888888] ml-[2rem]">
                          {format(video.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelUser;
