import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/config/hooks";
import { home } from "../redux/slices/option";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../redux/slices/currentUser";
import axios from "axios";

interface UserLogin {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [valueLogin, setValueLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const [validation, setValidation] = React.useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueLogin({ ...valueLogin, [e.target.name]: e.target.value });
  };

  const handleLogin = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (valueLogin.email === "" || valueLogin.password === "") {
      return setValidation("Not suitable");
    }
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/auth/login",
        {
          email: valueLogin.email,
          password: valueLogin.password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("accessToken", token);
      dispatch(fetchUsers(token));
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#d4cece50]">
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className="w-[50rem] bg-white p-8"
        >
          <div className="flex items-center justify-between">
            <div className="text-[3rem] font-bold">Login</div>
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
          {validation && <div className="text-red-500">{validation}</div>}
          <div className="mt-[2rem]">
            <div className="my-[1rem] font-bold">Email</div>
            <input
              name="email"
              onChange={handleInput}
              className="p-2 border w-full"
              type="text"
            />
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
              onClick={handleLogin}
              className=" py-[1.5rem]  text-[1.8rem] bg-blue-600 text-white w-full"
            >
              Login
            </button>
          </div>
          <Link to="/register">
            <div className="blue mt-6 text-blue-600">Don't have account </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
