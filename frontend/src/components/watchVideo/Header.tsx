import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineCamera } from "react-icons/hi";
import { GrKeyboard } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { AiOutlineFieldTime } from "react-icons/ai";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import SideBar from "./SideBar";
import Drawer from "react-modern-drawer";
import User from "./User";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/config/hooks";
import { home } from "../../redux/slices/option";
import "react-modern-drawer/dist/index.css";
import { fetchUsers } from "../../redux/slices/currentUser";
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken");
  const [isSearch, setIsSearch] = React.useState<boolean>(false);
  const [valueSearch, setValueSearch] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { videos } = useAppSelector((state) => state.videos);
  React.useEffect(() => {
    dispatch(fetchUsers(token));
  }, [dispatch, token]);
  const { user } = useAppSelector((state) => state.currentUser);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

  document.body.addEventListener("click", (e) => {
    setIsSearch(false);
    if (e.target === document.querySelector("#formSearch")) {
      setIsSearch(true);
    }
  });

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
      >
        <div className="p-[2rem]">
          <div className="flex items-center p-[1rem] ">
            <AiOutlineMenu
              onClick={toggleDrawer}
              className="cursor-pointer p-[0.5rem]"
              size={30}
            ></AiOutlineMenu>
            <div
              onClick={() => dispatch(home())}
              className="ml-[4rem] cursor-pointer"
            >
              <Link to={"/"}>
                <img
                  className="w-[8rem] h-[6rem]"
                  src="https://lifemedia.com.vn/wp-content/uploads/2022/11/A33_YouTube-1_1641887326-1024x831.webp"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="mt-[1rem]">
            <SideBar></SideBar>
          </div>
        </div>
      </Drawer>
      <div className="flex items-center justify-between fixed top-0 px-[3rem] py-[2rem] w-full bg-white z-50">
        <div className="flex items-center">
          <AiOutlineMenu
            onClick={toggleDrawer}
            className="cursor-pointer"
            size={25}
          ></AiOutlineMenu>
          <div className="ml-[4rem] cursor-pointer">
            <Link to={"/"}>
              <img
                onClick={() => dispatch(home())}
                className="w-[8rem] h-[6rem]"
                src="https://lifemedia.com.vn/wp-content/uploads/2022/11/A33_YouTube-1_1641887326-1024x831.webp"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="w-[50rem] relative">
          <input
            id="formSearch"
            onChange={(e) => handleInputSearch(e)}
            onFocus={() => setIsSearch(true)}
            className="border border-black w-full text-[2.2rem] p-[0.75rem] rounded-[2rem] pr-[5rem] focus:border-blue-500 focus:border-2"
            type="text"
          />
          <GrKeyboard
            size={25}
            className="absolute right-4 top-[50%] translate-y-[-50%]"
          ></GrKeyboard>
          {!isSearch ? (
            <div>
              {valueSearch.length < 1 ? (
                <CiSearch
                  className="absolute left-4 top-[50%] translate-y-[-50%]"
                  size={25}
                ></CiSearch>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="shadow-lg absolute w-full max-h-[160px] overflow-hidden rounded-[3rem] py-[2rem] bg-white z-10">
              {videos
                // eslint-disable-next-line array-callback-return
                .filter((video) => {
                  if (valueSearch === "") {
                    return video;
                  }
                  if (
                    video.title
                      .toLowerCase()
                      .includes(valueSearch.toLowerCase())
                  ) {
                    return video;
                  }
                })
                .map((video) => (
                  <Link to={`/watch/${video._id}`}>
                    <div className="flex items-center  hover:bg-[#89848423] p-[1rem] cursor-pointer">
                      <AiOutlineFieldTime size={24}></AiOutlineFieldTime>
                      <div className="text-[1.8rem] ml-[2rem]">
                        {video.title}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
        {user ? (
          <div className="flex items-center">
            <Link to={"/createVideo"}>
              <AiOutlineVideoCameraAdd
                className=" cursor-pointer mr-[4rem] "
                size={26}
              ></AiOutlineVideoCameraAdd>
            </Link>
            <Link to={"/webcam"}>
              <HiOutlineCamera
                className=" cursor-pointer  mr-[4rem]"
                size={26}
              ></HiOutlineCamera>
            </Link>
            <User></User>
          </div>
        ) : (
          <Link to={"/login"}>
            <div className="py-[1rem] px-[2rem] w-[15rem] rounded-[1rem] border-[1px] flex justify-between items-center cursor-pointer hover:bg-[#7074e432]">
              <FaRegUserCircle color="#467fef" size={25}></FaRegUserCircle>
              <div className="text-blue-600">Login </div>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;
