import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const LoginPopup = ({ DialogOpen, openTogler }) => {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <div
        className="flex flex-col gap-3 text-[1.1rem]  w-48 absolute z-30 bg-[#ffffff] shadow-xl border border-gray-100 rounded-xl transition duration-1000  mt-56  [&>*]:w-full  p-2 cursor-pointer "
        onClick={openTogler}
      >
        {!auth?.user ? (
          <Link onClick={DialogOpen} className="hover:bg-slate-300">
            Log in
          </Link>
        ) : (
          <div className="flex flex-col [&>*:hover]:bg-slate-300">
            <Link
              to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              onClick={openTogler}
            >
              Dashboard
            </Link>
          </div>
        )}
        <div className="bg-gray-300 h-[1px]"></div>
        <Link className="hover:bg-slate-300">Airbnb your phone</Link>
        <Link className="hover:bg-slate-300">Help</Link>
      </div>
    </>
  );
};

export default LoginPopup;
