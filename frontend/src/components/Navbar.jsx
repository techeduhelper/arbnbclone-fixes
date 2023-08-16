import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginPopup from "./LoginPopup";
import LoginDialog from "./LoginDialog";
import { useAuth } from "../context/auth";
import Search from "./Search";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openTogler = () => {
    setIsOpen(!isOpen);
  };

  // for login dialog
  const [openDialog, setOpenDialog] = useState(false);

  const DialogOpen = () => {
    setOpenDialog(true);
  };

  const DialogClose = () => {
    setOpenDialog(false);
  };

  // for get profile data
  const [auth, setAuth] = useAuth();

  return (
    <>
      {/* second header */}
      <header className="flex w-full items-center py-4 border-b-2 z-10 fixed bg-[#ffffff] md:justify-between md:px-20">
        <div className="flex justify-between sm:container w-full">
          <Link
            to={"/"}
            className="logo flex flex-row gap-2 text-red-500 text-[1.5rem] items-center justify-start cursor-pointer sm:invisible md:visible drop-shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            <span className="text-[#FF385C] font-bold font-[poppins] ">
              arbnb
            </span>
          </Link>
          {/* search box */}
          <Search />

          {/* profile section */}
          <div className="profile flex flex-row gap-3 items-center justify-between cursor-pointer sm:text-center sm:invisible md:visible">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>
            {isOpen && (
              <LoginPopup DialogOpen={DialogOpen} openTogler={openTogler} />
            )}
            <div
              onClick={openTogler}
              onMouseEnter={openTogler}
              className="flex border rounded-3xl p-1 hover:shadow-md text-gray-500 items-center px-3 gap-3 justify-center sm:mr-2 cursor-pointer"
            >
              <div>
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
              {!auth?.user ? (
                <Link
                  // to={"/Login"}
                  className="bg-gray-500 text-white rounded-full p-1 z-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              ) : (
                <div className="outline-red-500  text-black px-2 py-1 mr-0 font-bold rounded-full flex items-center w-40 justify-center">
                  {auth?.user?.name}
                </div>
              )}
            </div>
          </div>
        </div>
        <LoginDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          DialogClose={DialogClose}
        />
      </header>
    </>
  );
};

export default Navbar;
