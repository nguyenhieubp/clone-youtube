import React from "react";
import { format } from "timeago.js";

interface DetailVideoMain {
  create: Date;
  view: number;
  desc: String;
  title: String;
}

const DetailVideo: React.FC<DetailVideoMain> = ({
  view,
  create,
  desc,
  title,
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="mt-[2rem] bg-[#f2f2f2] p-[1rem] rounded-[1rem]">
      <div className="flex font-bold">
        <div className="text-[1.6rem]">{view} view</div>
        <div className="text-[1.6rem] ml-[2rem]">{format(create)}</div>
      </div>
      <div
        className="mt-[2rem]"
        style={show ? {} : { height: "10rem", overflow: "hidden" }}
      >
        <div className="my-[1rem]">{title}</div>
        <div>{desc}</div>
      </div>
      <div>
        {show ? (
          <button
            onClick={() => setShow(false)}
            className="font-bold mt-[2rem] cursor-pointer p-[0.25rem]"
          >
            Hidden
          </button>
        ) : (
          <button
            onClick={() => setShow(true)}
            className="font-bold mt-[2rem] cursor-pointer p-[0.25rem]"
          >
            Show
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailVideo;
