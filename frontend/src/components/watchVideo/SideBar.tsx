import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdReplay } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/config/hooks";
import { home, history, channelSelect } from "../../redux/slices/option";
import { useAppSelector } from "../../redux/config/hooks";
import { fetchChannelFlow } from "../../redux/slices/compare";
import { useNavigate } from "react-router-dom";

interface Channel {
  _id: number | null;
  name: string;
  avatar: string;
}

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const token = localStorage.getItem("accessToken");
  const { user } = useAppSelector((state) => state.currentUser);
  const { typeOption } = useAppSelector((state) => state.option);
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
              key={channel._id}
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
