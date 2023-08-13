import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

const Login = ({ HandleClose, accout, switchAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/arrbnb/v1/auth/login", {
        email,
        password,
      });
      console.log("Logging in with email:", email);
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        setTimeout(() => {
          HandleClose();
        }, 500);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <>
      <div className="login-dialog-content w-96 h-auto flex flex-col p-4 gap-6 justify-center">
        <div className="w-full flex flex-row ">
          <button onClick={HandleClose} className="float-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <span className="text-xl font-bold items-center ">
            {accout.heading}
          </span>
        </div>
        <form className="flex flex-col gap-5" onSubmit={loginHandler}>
          <input
            className="w-auto border border-gray-200 rounded-md p-2"
            type="email"
            name="email"
            id="email"
            placeholder="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-auto border border-gray-200 rounded-md p-2"
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#FF385C] border rounded-md p-2 text-white"
          >
            Sign In
          </button>
        </form>

        <span className="text-center ">
          Don't have an account yet!{" "}
          <span
            onClick={switchAccount}
            className="text-blue-400 text-md cursor-pointer hover:text-blue-500"
          >
            Register Here
          </span>
        </span>
      </div>
    </>
  );
};

export default Login;
