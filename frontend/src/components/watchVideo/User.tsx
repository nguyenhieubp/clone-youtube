import React from "react";
import { Link } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAppSelector } from "../../redux/config/hooks";
const User = () => {
  const [isOpenUser, setIsOpenUser] = React.useState<boolean>(false);
  const { user } = useAppSelector((state) => state.currentUser);

  return (
    <>
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
            <Link to={"/user"}>
              <div className="flex items-center justify-between cursor-pointer">
                <div className="w-[4rem] h-[4rem] flex items-center justify-center">
                  <img
                    className="rounded-full w-full h-full"
                    src={user.avatar}
                    alt=""
                  />
                </div>
                <div>{user.name}</div>
              </div>
            </Link>
            <div className="w-full h-[2px] bg-black my-[1rem]"></div>
            <Link to={"/login"}>
              <div className="flex items-center ">
                <RiLogoutBoxRLine size={24}></RiLogoutBoxRLine>
                <div className="ml-[3rem] font-bold">Logout</div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
