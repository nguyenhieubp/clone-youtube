import React from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { useAppDispatch } from "../redux/config/hooks";
import { addVideo } from "../redux/slices/Videos";

interface Video {
  avatar: any;
  url: any;
  title: string;
  category: string;
  desc: string;
}

const CreateVideo: React.FC = () => {
  const [upload, setUpload] = React.useState<boolean>();

  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken");
  const navigation = useNavigate();
  const [valueVideo, setValueVideo] = React.useState<Video>({
    avatar: null,
    url: null,
    title: "",
    category: "",
    desc: "",
  });

  const iconTimesRef = React.useRef<any>(null);
  const handleClose = () => {
    if (iconTimesRef.current) {
      iconTimesRef.current.style = ` transform: translate(-200rem,-100rem) scale(0); transition: 2s linear;`;
      setTimeout(() => {
        navigation("/");
      }, 1000);
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValueVideo({ ...valueVideo, [e.target.name]: e.target.value });
  };

  const uploadFile = (file: any, type: string) => {
    if (file.name) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              setUpload(true);
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpload(false);
            setValueVideo({ ...valueVideo, [type]: downloadURL });
          });
        }
      );
    }
  };

  console.log(valueVideo);

  React.useEffect(() => {
    valueVideo.url && uploadFile(valueVideo.url, "url");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueVideo.url]);

  React.useEffect(() => {
    valueVideo.avatar && uploadFile(valueVideo.avatar, "avatar");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueVideo.avatar]);

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/video",
        {
          url: valueVideo.url,
          image: valueVideo.avatar,
          title: valueVideo.title,
          category: valueVideo.category,
          desc: valueVideo.desc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addVideo(response.data.newVideo));
      navigation("/");
      setValueVideo({ avatar: "", desc: "", url: "", title: "", category: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <div
        className="fixed top-0 left-0 w-full h-full bg-[#fbf9f9bc]"
        style={upload ? { zIndex: 30 } : { zIndex: 0 }}
      >
        {upload && (
          <div className="absolute  right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-32 w-32"></div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center relative z-10 mt-[10rem]  ">
        <form
          onSubmit={handleSubmit}
          ref={iconTimesRef}
          className="bg-white p-[2rem]  w-[40rem] relative"
        >
          <div className="font-bold text-[2.2rem] mb-[2rem]">Create Video</div>
          <div onClick={handleClose}>
            <FaTimes
              size={26}
              className="absolute top-4 right-8 cursor-pointer p-2"
            ></FaTimes>
          </div>

          <div className="my-[1rem]">Title</div>
          <input
            name="title"
            onChange={handleChange}
            className="border p-[0.25rem] w-full"
            type="text"
          />
          <br />
          <div className="my-[1rem]">category</div>
          <input
            name="category"
            onChange={handleChange}
            className="border p-[0.25rem] w-full"
            type="text"
          />
          <br />
          <div className="my-[1rem]">Description</div>
          <textarea
            name="desc"
            onChange={handleChange}
            className="border p-[0.25rem] w-full h-[10rem]"
          />
          <br />
          <div className="mb-[1rem] ">Avatar</div>
          <input
            onChange={(e: any) =>
              setValueVideo({ ...valueVideo, avatar: e.target.files[0] })
            }
            className="border p-[0.25rem] w-full"
            type="file"
          />
          <div className="my-[1rem]">URL Video</div>
          <input
            onChange={(e: any) =>
              setValueVideo({ ...valueVideo, url: e.target.files[0] })
            }
            className="border p-[0.25rem] w-full"
            type="file"
          />
          <br />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white w-full mt-[2rem] p-[0.5rem]"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVideo;
