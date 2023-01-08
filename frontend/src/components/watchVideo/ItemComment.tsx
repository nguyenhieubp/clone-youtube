import React from "react";

const ItemComment: React.FC = () => {
  return (
    <div className="my-[2rem] flex items-start gap-[2rem]">
      <div className="w-[5rem] h-[5rem] flex-shrink-0">
        <img
          className="w-full h-full rounded-full object-cover"
          src="https://images.unsplash.com/photo-1667286161287-c36b304425b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <div className="font-bold">Zuka</div>
          <div className="ml-[1rem]">1 mouth ago</div>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          fugiat asperiores dolor molestias harum officia nam maxime dicta hic!
          Repellendus, cupiditate consequatur voluptate quis expedita quas
          aliquam labore dolorem sunt?
        </div>
      </div>
    </div>
  );
};

export default ItemComment;
