import React from "react";
import FooterVideoMain from "./FooterVideoMain";
import DetailVideo from "./DetailVideo";
import Comments from "./Comments";
import { useAppSelector } from "../../redux/config/hooks";

const VideoMain: React.FC = () => {
  const { video, error, load } = useAppSelector((state) => state.playVideo);

  return (
    <div>
      {error && <div>{error}</div>}
      {load && <div>Loading...</div>}
      {video && (
        <>
          <video
            autoPlay
            controls
            className="w-full h-[55rem]"
            src={video.url}
          ></video>
          <FooterVideoMain
            idVideo={video._id}
            title={video.title}
            author={video.author}
            like={video.like}
          ></FooterVideoMain>
          <DetailVideo
            create={video.createdAt}
            view={video.view}
            desc={video.desc}
            title={video.title}
          ></DetailVideo>
          <Comments></Comments>
        </>
      )}
    </div>
  );
};

export default VideoMain;
