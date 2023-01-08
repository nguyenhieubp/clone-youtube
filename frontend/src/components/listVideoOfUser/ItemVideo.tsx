import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { useAppDispatch } from "../../redux/config/hooks";
import { format } from "timeago.js";
import { deleteVideo, updateVideo } from "../../redux/slices/listVideoOfUser";

interface Author {
  name: String;
}

interface Video {
  id: number;
  title: string;
  desc: string;
  author: Author;
  date: Date;
  image: string;
  view: number;
}

interface FormUpdate {
  title: string;
  desc: string;
}

const ItemVideo: React.FC<Video> = ({
  author,
  date,
  desc,
  image,
  title,
  view,
  id,
}) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken");
  const [openSetting, setOpenSetting] = React.useState<boolean>(false);
  const [valueVideoUpdate, setValueVideo] = React.useState<FormUpdate>({
    desc: desc,
    title: title,
  });

  const changeValue = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValueVideo({ ...valueVideoUpdate, [e.target.name]: e.target.value });
  };

  //Update video
  const updateVideos = () => {
    dispatch(updateVideo({ id, token, valueVideoUpdate }));
    setOpenSetting(false);
  };

  const deleteVideos = () => {
    dispatch(deleteVideo({ id, token }));
    setOpenSetting(false);
  };

  return (
    <>
      <div className="w-full h-[18rem] mb-[15rem] p-[1rem] ">
        <div className="w-full h-full ">
          <img className="w-full h-full rounded-[1rem]" src={image} alt="" />
        </div>
        <div className="flex flex-col p-[1rem]">
          <div className="title-video-relate ">{desc}</div>
          <div className="mt-[1rem]">
            <div className="text-[#888888] overflow-hidden line-clamp-3 ">
              {author.name}
            </div>
            <div className="flex items-center justify-between mt-[1rem]">
              <div className="flex  items-center">
                <div className="text-[#888888]">{view} views</div>
                <div className="text-[#888888] ml-[2rem]">• {format(date)}</div>
              </div>
              <div
                onClick={() => setOpenSetting(true)}
                className="p-[1rem] hover:bg-[#89898d33] cursor-pointer rounded-full"
              >
                <AiOutlineSetting size={24}></AiOutlineSetting>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openSetting && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#d4cece50]">
          <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
            <div className="w-[50rem] bg-white p-8">
              <div className="w-[10rem] h-[5rem] mx-auto">
                <img
                  className="w-full h-full object-cover"
                  src="https://lifemedia.com.vn/wp-content/uploads/2022/11/A33_YouTube-1_1641887326-1024x831.webp"
                  alt=""
                />
              </div>
              <div className="mt-[2rem]">
                <div className="mb-[1rem] font-bold">Title</div>
                <input
                  value={valueVideoUpdate.title}
                  name="title"
                  onChange={changeValue}
                  className="p-2 border w-full"
                  type="text"
                />
                <br />
                <div className="my-[1rem] font-bold">Description</div>
                <textarea
                  value={valueVideoUpdate.desc}
                  name="desc"
                  onChange={changeValue}
                  className="p-2 border w-full h-[10rem]"
                />
              </div>
              <div className="flex justify-end mt-[2rem]">
                <button
                  onClick={() => setOpenSetting(false)}
                  className="mx-[1rem] px-[2rem] py-[0.75rem] rounded-[1rem] bg-[#ffa500]  text-white"
                >
                  Cannel
                </button>
                <button
                  onClick={updateVideos}
                  className="mx-[1rem] px-[2rem] py-[0.75rem] rounded-[1rem] bg-blue-600 text-white"
                >
                  Update
                </button>
                <button
                  onClick={deleteVideos}
                  className="mx-[1rem] px-[2rem] py-[0.75rem] rounded-[1rem] bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemVideo;
