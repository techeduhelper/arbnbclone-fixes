import React, { useState } from "react";

const Booking = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState(1);

  return (
    <>
      <div className="md:ml-10 sm:w-full md:w-2/5 bg-[#ffffff] shadow-xl sticky-top rounded-md h-[400px] border z-10 flex sm:">
        <div className="flex flex-col justify-start p-10 w-full">
          <div className="flex  justify-between">
            <div className="flex flex-col">
              <span className="text-2xl text-gray-900 items-center">
                ₹ {place.price}
              </span>
              <span className="text-gray-500">Total before taxes</span>
            </div>
            <span className="">1 review</span>
          </div>
          <div className=" w-full grid grid-rows-2 border border-gray-500 rounded-lg h-40 mt-4 align-middle">
            <div className="w-full p-1 border-none">
              <div className="flex w-full justify-between gap-1 border-b-4">
                <div className="w-full flex flex-col items-center p-2 rounded-tl-lg border-r-2">
                  <span className=" text-xl text-gray-700">Check In</span>
                  <span>
                    <input
                      className="outline-none "
                      type="date"
                      placeholder="Add Date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </span>
                </div>
                <div className="w-full flex flex-col items-center">
                  <span className="text-xl text-gray-700 ">Check Out</span>
                  <span className="px-4">
                    <input
                      className="outline-none "
                      type="date"
                      placeholder="Add Date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[60%]  mt-4 text-center">
              <input
                type="number"
                name=""
                id=""
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                className="w-[95%] h-4/5 outline-none bg-slate-100 rounded-lg px-4 font-bold"
              />
            </div>
          </div>
          <button className="mt-4 w-full py-3 text-white rounded-md bg-red-500">
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Booking;
