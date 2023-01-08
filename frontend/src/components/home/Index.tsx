import React from "react";
import Header from "../home/Header";
import GridVideo from "./GridVideo";
import SideBar from "./SideBar";

const Index = () => {
  return (
    <div className="grid grid-cols-7">
      <div className="col-span-1 p-[2rem]">
        <SideBar></SideBar>
      </div>
      <div className="col-span-6 ">
        <Header></Header>
        <div className="mt-[10rem]">
          <GridVideo></GridVideo>
        </div>
      </div>
    </div>
  );
};

export default Index;
