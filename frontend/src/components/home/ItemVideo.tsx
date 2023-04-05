import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

interface Author {
  name: string;
}

interface Video {
  id: number;
  createdAt: Date;
  title: string;
  image: string;
  view: number;
  author: Author;
}

const ItemVideo: React.FC<Video> = ({
  id,
  createdAt,
  image,
  view,
  author,
  title,
}) => {
  return (
    <Link to={`/watch/${id}`}>
      <div className="w-full h-[18rem] mb-[10rem] p-[1rem] cursor-pointer ">
        <div className="w-full h-full ">
          <img
            className="w-full h-full rounded-[1rem] object-cover"
            src={image}
            alt=""
          />
        </div>
        <div className="flex flex-col p-[1rem]">
          <div className="title-video-relate ">{title}</div>
          <div className="mt-[1rem]">
            <div className="text-[#888888] overflow-hidden line-clamp-3 ">
              {author?.name}
            </div>
            <div className="flex  items-center mt-[1rem]">
              <div className="text-[#888888]">
                {view} views • {format(createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemVideo;
