import React from "react";
import { useAppSelector } from "../../redux/config/hooks";
import ItemVideoRelate from "./ItemVideoRelate";
import { useParams } from "react-router-dom";

const ListVideoRelate: React.FC = () => {
  const { videos } = useAppSelector((state) => state.videos);
  const { video } = useParams();

  const videoRelates = videos.filter((item) => {
    return item._id.toString() !== video;
  });

  return (
    <div>
      {videoRelates.map((video) => (
        <ItemVideoRelate
          key={video._id}
          id={video._id}
          title={video.title}
          view={video.view}
          date={video.createdAt}
          authorName={video.author.name}
          image={video.image}
        ></ItemVideoRelate>
      ))}
    </div>
  );
};

export default ListVideoRelate;
