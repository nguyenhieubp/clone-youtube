import React from "react";
import ItemVideo from "../home/ItemVideo";
import { fetchVideos } from "../../redux/slices/Videos";
import { useAppDispatch, useAppSelector } from "../../redux/config/hooks";
const GridVideo: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const { videos } = useAppSelector((state) => state.videos);

  return (
    <div className="grid grid-cols-4 gap-8">
      {videos.map((video) => (
        <div key={video._id}>
          <ItemVideo
            id={video._id}
            view={video.view}
            author={video.author}
            image={video.image}
            title={video.title}
            createdAt={video.createdAt}
          ></ItemVideo>
        </div>
      ))}
    </div>
  );
};

export default GridVideo;
