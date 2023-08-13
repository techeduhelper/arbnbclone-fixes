import React from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../context/auth";
import Img1 from "../assets/arbnb.jpg";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <div className="booking flex justify-center mt-6 mb-5 w-full">
        <UserMenu />
      </div>
      <div className="flex flex-col w-full text-center h-[75vh] bg-[Img1]">
        <span className="text-[250px] text-red-500 font-bold">☺</span>
        <h1 className="text-3xl">
          Welcome to
          <span className="font-semibold text-4xl">
            {" "}
            {auth.user?.name}
          </span>{" "}
        </h1>
      </div>
    </>
  );
};

export default Dashboard;
