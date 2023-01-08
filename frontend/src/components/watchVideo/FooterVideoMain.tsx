import React from "react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineBell,
  AiFillDislike,
} from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/config/hooks";
import {
  fetchUserDisLikeVideo,
  fetchUserLikeVideo,
  fetchUserSub,
} from "../../redux/slices/compare";
import {
  disLikeVideo,
  likeVideo,
  sub,
  subChannel,
  unDisLikeVideo,
  unLikeVideo,
  unSub,
  unSubChannel,
} from "../../redux/slices/playVideo";
interface Author {
  _id: number;
  avatar: string;
  name: string;
  subscribeUser: [number];
}

interface DetailVideo {
  title: String;
  author: Author;
  like: [number];
  idVideo: number;
}

const FooterVideoMain: React.FC<DetailVideo> = ({
  author,
  like,
  title,
  idVideo,
}) => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken");
  const { user } = useAppSelector((state) => state.currentUser);

  //---------------------------------------------------------
  //---------------------------------------------------------
  //LIST USER SUB
  const [isSub, setIsSub] = React.useState<any>();
  React.useEffect(() => {
    dispatch(fetchUserSub({ id: author._id, token: token }));
  }, [author._id, dispatch, token]);
  const { listUserSub } = useAppSelector((state) => state.compare);

  React.useEffect(() => {
    const isSubs = listUserSub.find((item) => {
      return item === user._id?.toString();
    });
    setIsSub(isSubs);
  }, [listUserSub, user._id]);
  //SUB
  const handleSub = async () => {
    dispatch(sub({ authorId: author._id, token, userCurrent: user._id }));
    dispatch(subChannel({ authorId: author._id, token }));
    setIsSub(true);
  };

  //UNSUB
  const handleUnSub = async () => {
    dispatch(unSub({ authorId: author._id, token, userCurrent: user._id }));
    dispatch(unSubChannel({ authorId: author._id, token }));
    setIsSub(false);
  };

  //  ---------------------------------------
  //  ---------------------------------------

  //  ---------------------------------------
  //  ---------------------------------------

  //  FETCH LIST USER LIKE
  const { listUserLike } = useAppSelector((state) => state.compare);
  const [isUserLike, setUserLike] = React.useState<any>("");
  React.useEffect(() => {
    dispatch(fetchUserLikeVideo({ idVideo: idVideo, token }));
  }, [dispatch, idVideo, token]);

  React.useEffect(() => {
    const isLike = listUserLike.find((item) => {
      return item === user._id;
    });
    setUserLike(isLike);
  }, [listUserLike, user._id]);

  //Like Video
  const likeVideoFC = () => {
    dispatch(likeVideo({ id: idVideo, token, userCurrent: user._id }));
    setUserLike(true);
  };

  const unLikeVideoFC = () => {
    dispatch(unLikeVideo({ id: idVideo, token, userCurrent: user._id }));
    setUserLike(false);
  };

  //------------------------------------------------------------
  //------------------------------------------------------------
  //DisLike video
  const { listUserDisLike } = useAppSelector((state) => state.compare);
  const [isDislike, setIsDisLike] = React.useState<any>();

  React.useEffect(() => {
    dispatch(fetchUserDisLikeVideo({ idVideo: idVideo, token }));
  }, [dispatch, idVideo, token]);

  React.useEffect(() => {
    const isDislike = listUserDisLike.find((item) => {
      return item === user._id?.toString();
    });
    setIsDisLike(isDislike);
  }, [listUserDisLike, user._id]);

  const dislikeFC = () => {
    dispatch(disLikeVideo({ id: idVideo, token, userCurrent: user._id }));
    setIsDisLike(true);
  };

  const unDislikeFC = () => {
    dispatch(unDisLikeVideo({ id: idVideo, token, userCurrent: user._id }));
    setIsDisLike(false);
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-[2.4rem]">{title}</h1>
      <div className="mt-[1rem] flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-[5rem] h-[5rem]">
            <img
              className="w-full h-full rounded-full"
              src="https://images.unsplash.com/photo-1667312402038-4845f64bc27c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-between items-start ml-[2rem] ">
            <div className="my-[0.25rem] font-bold text-[2rem]">
              {author.name}
            </div>
            <div className="my-[0.25rem]">
              {author.subscribeUser.length} Subscribe
            </div>
          </div>
          {!isSub ? (
            <button
              onClick={handleSub}
              className="ml-[4rem] bg-black text-white p-[1rem] rounded-full"
            >
              Subscribe
            </button>
          ) : (
            <div className="flex items-center">
              <button
                onClick={handleUnSub}
                className="ml-[4rem] bg-[#cbc5cb89] text-black p-[1rem] rounded-full"
              >
                Un Subscribe
              </button>
              <AiOutlineBell
                className="cursor-pointer ml-[2rem]"
                size={25}
              ></AiOutlineBell>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <div>
            {!isUserLike ? (
              <button
                onClick={likeVideoFC}
                className="p-[1.25rem] border-r-2  bg-[#f2f2f2] rounded-l-[2rem]  hover:bg-[#a7a09d51]"
              >
                <div className="flex items-center  pr-4">
                  <AiOutlineLike size={24}></AiOutlineLike>
                  <div className="ml-[1rem] font-bold">{like.length}</div>
                </div>
              </button>
            ) : (
              <button
                onClick={unLikeVideoFC}
                className="p-[1.25rem] border-r-2  bg-[#f2f2f2] rounded-l-[2rem]  hover:bg-[#a7a09d51]"
              >
                <div className="flex items-center  pr-4">
                  <AiFillLike size={24}></AiFillLike>
                  <div className="ml-[1rem] font-bold">{like.length}</div>
                </div>
              </button>
            )}
            {!isDislike ? (
              <button
                onClick={dislikeFC}
                className="p-[1.25rem] bg-[#f2f2f2] rounded-r-[2rem] hover:bg-[#a7a09d51]"
              >
                <div className="flex items-center">
                  <AiOutlineDislike size={24}></AiOutlineDislike>
                </div>
              </button>
            ) : (
              <button
                onClick={unDislikeFC}
                className="p-[1.25rem] bg-[#f2f2f2] rounded-r-[2rem] hover:bg-[#a7a09d51]"
              >
                <div className="flex items-center">
                  <AiFillDislike size={24}></AiFillDislike>
                </div>
              </button>
            )}
          </div>
          <button className="p-[1.25rem] bg-[#f2f2f2] rounded-[2rem] mx-[3rem] hover:bg-[#a7a09d49]">
            <div className="flex items-center">
              <RiShareForwardLine size={24}></RiShareForwardLine>
              <div className="ml-6 font-bold">Share</div>
            </div>
          </button>
          <button className="p-[1.25rem] bg-[#f2f2f2] rounded-[2rem] hover:bg-[#a7a09d4a]">
            <BsThreeDots size={24}></BsThreeDots>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterVideoMain;
