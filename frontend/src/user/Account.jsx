import React from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../context/auth.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    setTimeout(() => navigate("/"), 300);
  };

  return (
    <>
      <div className="booking flex justify-center  mt-6 mb-5">
        <UserMenu />
      </div>
      <div className="w-full text-center h-[70vh] flex flex-col items-center">
        <span className="mt-11 text-xl">
          Logged in as{" "}
          <span className="text-xl font-bold ">{auth?.user?.name}</span> (
          {auth?.user?.email})
        </span>
        <button
          className="w-2/4 py-2 rounded-full mt-20 bg-red-500 text-white font-bold text-xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Account;
