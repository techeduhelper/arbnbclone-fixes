import React from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../context/auth";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <div className="booking flex justify-center mt-6 mb-5 w-full">
        <UserMenu />
      </div>
      <div className="w-full text-center h-[75vh]">
        <h1>{`Welcome ${auth.user?.name}`}</h1>
      </div>
    </>
  );
};

export default Dashboard;
