import React from "react";
import { HiOutlineCamera } from "react-icons/hi";
import { GrKeyboard } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { AiOutlineFieldTime } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useAppSelector } from "../../redux/config/hooks";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/config/hooks";
import { fetchUsers } from "../../redux/slices/currentUser";
const Header: React.FC = () => {
  const token = localStorage.getItem("accessToken");
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [isSearch, setIsSearch] = React.useState<boolean>(false);
  const [valueSearch, setValueSearch] = React.useState<string>("");
  const [isOpenUser, setIsOpenUser] = React.useState(false);
  const { videos } = useAppSelector((state) => state.videos);

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

  React.useEffect(() => {
    dispatch(fetchUsers(token));
  }, [dispatch, token]);
  const { user } = useAppSelector((state) => state.currentUser);

  document.body.addEventListener("click", (e) => {
    setIsSearch(false);
    if (e.target === document.querySelector("#formSearch")) {
      setIsSearch(true);
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigation("/login");
  };

  const handleToPageUser = () => {
    navigation("/user", { state: user });
  };

  return (
    <div className="flex items-center w-[85%] justify-between fixed top-0 px-[3rem] py-[2rem]  bg-white ">
      <div className="w-[60rem] relative">
        <input
          id="formSearch"
          onChange={(e) => handleInputSearch(e)}
          onFocus={() => setIsSearch(true)}
          className="border border-black w-full text-[2.2rem] p-[0.75rem] pr-[5rem] rounded-[2rem] focus:border-blue-500 focus:border-2 "
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
                  video.title.toLowerCase().includes(valueSearch.toLowerCase())
                ) {
                  return video;
                }
              })
              .map((video) => (
                <Link to={`/watch/${video._id}`}>
                  <div className="flex items-center  hover:bg-[#89848423] p-[1rem] cursor-pointer">
                    <AiOutlineFieldTime size={24}></AiOutlineFieldTime>
                    <div className="text-[1.8rem] ml-[2rem]">{video.title}</div>
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
              className=" cursor-pointer mr-[4rem]"
              size={26}
            ></HiOutlineCamera>
          </Link>
          <div className="relative">
            <div
              onClick={() => setIsOpenUser(!isOpenUser)}
              className="w-[4rem] h-[4rem]"
            >
              <img
                className="w-full h-full rounded-full cursor-pointer"
                src={user.avatar}
                alt=""
              />
            </div>
            {isOpenUser && (
              <div className="absolute w-[20rem] left-[-22rem] top-0 bg-white shadow p-[2rem] rounded-[1rem]">
                <div onClick={handleToPageUser}>
                  <div className="flex items-center ">
                    <div className="w-[4rem] h-[4rem] flex items-center justify-center">
                      <img
                        className="rounded-full w-full h-full flex-shrink-0"
                        src={user.avatar}
                        alt=""
                      />
                    </div>
                    <div className="ml-[2rem]">{user.name}</div>
                  </div>
                </div>
                <div className="w-full h-[2px] bg-black my-[1rem]"></div>
                <div onClick={handleLogout}>
                  <div className="flex items-center ">
                    <RiLogoutBoxRLine size={24}></RiLogoutBoxRLine>
                    <div className="ml-[3rem] font-bold">Logout</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Link to={"/login"}>
          <div className="py-[1rem] px-[2rem] w-[15rem] rounded-[1rem] border-[1px] flex justify-between items-center cursor-pointer hover:bg-[#7074e432]">
            <FaRegUserCircle color="#467fef" size={25}></FaRegUserCircle>
            <div className="text-blue-600">Login</div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Header;
