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
  const [mobileLogin, setMobileLogin] = useState();
  const [afterOtp, setAfterOtp] = useState(false);
  const [mobno, setMobno] = useState("");
  const [error, setError] = useState("");

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

  // toggler login form
  const handleMobileLogin = () => {
    setMobileLogin(!mobileLogin);
  };

  // send otp
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/arrbnb/v1/auth/otp-login", {
        mobno,
      });
      if (response.data.success) {
        setAfterOtp(true);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred while sending OTP.");
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
        {!mobileLogin ? (
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
        ) : (
          <form className="">
            <div className="text-center">
              <input
                value={mobno}
                onChange={(e) => setMobno(e.target.value)}
                type="tel"
                name="mobno"
                placeholder="Enter Mobile no"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {!afterOtp ? (
                <button
                  onClick={handleSendOtp}
                  className="mt-4 py-2 bg-slate-50 font-bold w-full rounded-lg hover:bg-slate-400 hover:text-white"
                >
                  Send Otp
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button onClick={handleOtpLogin}>Login</button>
                </>
              )}
              {error && <p>{error}</p>}
            </div>
          </form>
        )}

        <p className="text-center text-xl font-semibold">or</p>
        <form action="">
          <span
            className="flex justify-center bg-slate-200 font-medium py-2 text-lg font-cursive cursor-pointer shadow-lg capitalize"
            onClick={handleMobileLogin}
          >
            {!mobileLogin ? " Login Using Mobile No" : "contine with username"}
          </span>
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
