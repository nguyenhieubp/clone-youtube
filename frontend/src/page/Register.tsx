import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/config/hooks";
import { home } from "../redux/slices/option";
import { useNavigate } from "react-router-dom";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";

const imageDefault =
  "https://images.unsplash.com/photo-1667610515781-abfeca17fc6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60";

interface Image {
  Preview: string;
}

interface UserRegister {
  avatar: String;
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigation = useNavigate();

  const [image, setImage] = React.useState<Image>({
    Preview: imageDefault,
  });

  const [validation, setValidation] = React.useState<string>("");

  const [valueRegister, setValueRegister] = useState<UserRegister>({
    avatar: image.Preview,
    email: "",
    name: "",
    password: "",
  });

  const handleSelectImage = (e: any) => {
    const file = e.currentTarget.files![0];
    file.Preview = URL.createObjectURL(file);
    setImage(file);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueRegister({ ...valueRegister, [e.target.name]: e.target.value });
  };

  const uploadFile = (file: any) => {
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
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setValueRegister({ ...valueRegister, avatar: downloadURL });
          });
        }
      );
    }
  };

  React.useEffect(() => {
    uploadFile(image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const handleRegister = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.preventDefault();
    if (
      valueRegister.avatar === "" ||
      valueRegister.name === "" ||
      valueRegister.email === "" ||
      valueRegister.password === ""
    ) {
      return setValidation("Not suitable");
    }
    try {
      await axios.post("http://localhost:9000/api/v1/auth/register", {
        avatar: valueRegister.avatar,
        name: valueRegister.name,
        email: valueRegister.email,
        password: valueRegister.password,
      });
      navigation("/login");
      setValueRegister({ avatar: "", email: "", name: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useAppDispatch();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#d4cece50]">
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <form
          onSubmit={handleRegister}
          autoComplete="off"
          className="w-[50rem] bg-white p-8"
        >
          <div className="flex items-center justify-between">
            <div className="text-[3rem] font-bold">Register</div>
            <Link to={"/"}>
              <div
                onClick={() => dispatch(home())}
                id="Logo"
                className="w-[20rem] h-[10rem] flex justify-center items-center"
              >
                <img
                  className="w-full h-full object-cover"
                  src="	https://lifemedia.com.vn/wp-content/uploads/2022/11/A33_YouTube-1_1641887326-1024x831.webp"
                  alt=""
                />
              </div>
            </Link>
          </div>
          <div className="text-red-500">{validation}</div>
          <div className="mt-[2rem]">
            <div>
              <div className="mb-[1rem] font-bold">Avatar</div>
              <div className="w-[100%] h-[20rem] relative">
                <img
                  className="w-full h-full object-cover"
                  src={image.Preview}
                  alt=""
                />
                <input
                  onChange={(e) => handleSelectImage(e)}
                  className="p-2 absolute right-0 bottom-0 w-[9rem] "
                  type="file"
                />
              </div>
              <br />
            </div>
            <div className="my-[1rem] font-bold">Name</div>
            <input
              name="name"
              onChange={handleInput}
              className="p-2 border w-full"
              type="text"
            />{" "}
            <br />
            <div className="my-[1rem] font-bold">Email</div>
            <input
              name="email"
              onChange={handleInput}
              className="p-2 border w-full"
              type="text"
            />{" "}
            <br />
            <div className="my-[1rem] font-bold">Password</div>
            <input
              name="password"
              onChange={handleInput}
              className="p-2 border w-full"
              type="text"
            />
          </div>
          <div className=" mt-[2rem] w-full">
            <button
              onClick={handleRegister}
              className="  py-[1.5rem]  bg-blue-600 text-white w-full"
            >
              Register
            </button>
          </div>
          <Link to="/login">
            <div className="text-blue-600 mt-[2rem] text-[1.8rem]">Login</div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
