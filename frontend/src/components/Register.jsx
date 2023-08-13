import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Login from "./Login";

const Register = ({ switchSignIn, HandleClose, accout }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobno, setMobno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const resgisterUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/arrbnb/v1/auth/register", {
        firstname,
        lastname,
        email,
        mobno,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setFirstname("");
        setLastname("");
        setMobno("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          switchSignIn();
        }, 500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Wrong");
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
        <form className="flex flex-col gap-4" onSubmit={resgisterUser}>
          <input
            className="w-auto border border-gray-200 rounded-md p-2"
            type="text"
            name="firstname"
            id="firstname"
            placeholder="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            className="w-auto border border-gray-200 rounded-md p-2"
            type="text"
            name="lastname"
            id="lastname"
            placeholder="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            className="w-auto border border-gray-200 rounded-md p-2"
            type="number"
            name="mobileno"
            id="mobileno"
            placeholder="mobileno"
            value={mobno}
            onChange={(e) => setMobno(e.target.value)}
          />
          <input
            className="w-auto border border-gray-200 rounded-md p-2"
            type="email"
            name="email"
            id="email"
            placeholder="email"
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
            Sign up
          </button>
        </form>

        <span className="text-center">
          Already have an account!{" "}
          <span
            onClick={switchSignIn}
            className="text-blue-400 cursor-pointer hover:text-blue-500"
          >
            Login here
          </span>
        </span>
      </div>
    </>
  );
};

export default Register;
