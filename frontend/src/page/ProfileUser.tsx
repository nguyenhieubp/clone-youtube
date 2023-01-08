import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/config/hooks";
const ProfileUser: React.FC = () => {
  const location = useLocation();
  const { name, subscribeUser, avatar } = location.state;
  const { user } = useAppSelector((state) => state.currentUser);
  return (
    <div className="flex justify-center mt-[20rem]">
      <div>
        <div className="w-[20rem] h-[20rem]">
          <img className="w-full h-full rounded-full" src={avatar} alt="" />
        </div>
        <div className="mt-[2rem]">
          <div className="my-[1rem]">User Name: {name}</div>
          <div>Follow: {subscribeUser.length}</div>
        </div>
        <Link to={`/listVideo/${user._id}`}>
          <div className="mt-[2rem] bg-blue-600 flex justify-center p-2">
            <button className="text-white">All Video</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileUser;
