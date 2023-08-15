import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="lg:px-20 pt-24 h-auto">
      <Toaster />
      <Outlet />
    </div>
  );
};

export default Layout;
