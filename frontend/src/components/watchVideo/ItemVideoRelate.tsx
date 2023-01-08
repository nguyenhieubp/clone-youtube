import React from "react";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

interface Video {
  id: number;
  title: string;
  view: number;
  date: Date;
  authorName: string;
  image: string;
}

const ItemVideoRelate: React.FC<Video> = ({
  id,
  title,
  authorName,
  date,
  image,
  view,
}) => {
  return (
    <Link to={`/watch/${id}`}>
      <div className="w-full h-[12rem] mb-[1rem] p-[1rem] flex items-start ">
        <div className="w-[18rem] h-full ">
          <img className="w-full h-full" src={image} alt="" />
        </div>
        <div className="ml-[1rem] flex flex-col ">
          <div className="title-video-relate ">{title}</div>
          <div className="mt-[2rem]">
            <div className="text-[#888888] overflow-hidden line-clamp-3 ">
              {authorName}
            </div>
            <div className="flex justify-between items-center mt-[1rem]">
              <div className="text-[#888888]">{view} views</div>
              <div className=" text-[#888888]">-</div>
              <div className="text-[#888888]">{format(date)}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemVideoRelate;
