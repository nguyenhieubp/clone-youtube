import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdReplay } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/config/hooks";
import { fetchChannelFlow } from "../../redux/slices/compare";
import { home, history, channelSelect } from "../../redux/slices/option";
import { useNavigate } from "react-router-dom";

interface Channel {
  _id: number | null;
  name: string;
  avatar: string;
}

const SideBar = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken");
  const { typeOption } = useAppSelector((state) => state.option);
  const { user } = useAppSelector((state) => state.currentUser);

  React.useEffect(() => {
    dispatch(fetchChannelFlow({ token }));
  }, [dispatch, token]);

  const { listChannel } = useAppSelector((state) => state.compare);

  const selectChannel = (channel: Channel) => {
    dispatch(channelSelect(channel._id));
    navigation(`/channel/${channel._id}`, { state: channel });
  };

  return (
    <div>
      <Link to={"/"}>
        <div
          onClick={() => dispatch(home())}
          className="flex items-center p-[1rem] mb-[2rem] "
        >
          <div className=" cursor-pointer">
            <img
              className="w-[14rem] h-[8rem] object-cover"
              src="https://lifemedia.com.vn/wp-content/uploads/2022/11/A33_YouTube-1_1641887326-1024x831.webp"
              alt=""
            />
          </div>
        </div>
      </Link>
      <Link to="/">
        <div
          onClick={() => dispatch(home())}
          style={typeOption === "Home" ? { background: "#f1f1f1" } : {}}
          className="flex items-end cursor-pointer p-[1rem] rounded-[1rem] mb-[2rem] hover:bg-[#a7a3a32a]"
        >
          <AiOutlineHome size={25}></AiOutlineHome>
          <div className="ml-[4rem] text-[1.8rem]">Home</div>
        </div>
      </Link>
      {user && (
        <>
          <Link to={"/history"}>
            <div
              onClick={() => dispatch(history())}
              style={typeOption === "History" ? { background: "#f1f1f1" } : {}}
              className="flex items-end cursor-pointer p-[1rem] rounded-[1rem] mb-[2rem] hover:bg-[#a7a3a32a]"
            >
              <MdReplay size={25}></MdReplay>
              <div className="ml-[4rem] text-[1.8rem]">History Video</div>
            </div>
          </Link>
          <hr></hr>
          <div className="my-[2rem]">Channel Follow</div>
          {listChannel.channel.map((channel) => (
            <div
              style={
                typeOption === channel._id?.toString()
                  ? { background: "#f1f1f1" }
                  : {}
              }
              onClick={() => selectChannel(channel)}
            >
              <div className="flex justify-between items-center p-[0.75rem] cursor-pointer hover:bg-[#a7a3a32a] mb-[2rem] rounded-[1.5rem]">
                <div className="flex items-center   ">
                  <div className="w-[4rem] h-[4rem]">
                    <img
                      className="w-full h-full rounded-full"
                      src={channel.avatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-[2rem]">{channel.name}</div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SideBar;
