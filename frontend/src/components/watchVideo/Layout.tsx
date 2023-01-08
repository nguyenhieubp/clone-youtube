import React from "react";
import VideoMain from "./VideoMain";
import ListVideoRelate from "./ListVideoRelate";
const Layout: React.FC = () => {
  return (
    <div className="grid grid-cols-7 mt-[7rem] gap-[2rem] p-[2rem] ">
      <div className="col-span-5">
        <VideoMain></VideoMain>
      </div>
      <div className="col-span-2">
        <ListVideoRelate></ListVideoRelate>
      </div>
    </div>
  );
};

export default Layout;
