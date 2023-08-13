import React from "react";
import UserMenu from "./UserMenu";

const Bookings = () => {
  return (
    <>
      <div className="booking flex justify-center mt-6 mb-5">
        <UserMenu />
      </div>
      <div className="w-full text-center h-[70vh]">My Recent Bookings</div>
    </>
  );
};

export default Bookings;
