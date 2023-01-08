import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/config/hooks";
import ItemVideo from "./ItemVideo";
import { useParams } from "react-router-dom";
import { fetchVideoOfUser } from "../../redux/slices/listVideoOfUser";
const ListVideo = () => {
  const { user } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchVideoOfUser({ userId: user }));
  }, [dispatch, user]);
  const { videos } = useAppSelector((state) => state.videoOfUser);

  return (
    <div className="grid grid-cols-4">
      {videos?.map((video) => (
        <div key={video._id}>
          <ItemVideo
            id={video._id}
            title={video.title}
            view={video.view}
            image={video.image}
            desc={video.desc}
            author={video.author}
            date={video.createdAt}
          ></ItemVideo>
        </div>
      ))}
    </div>
  );
};

export default ListVideo;
