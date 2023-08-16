import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../context/auth.jsx";
import axios from "axios";
import { format } from "date-fns";
import { BiTransfer } from "react-icons/bi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Bookings = () => {
  const [auth, setAuth] = useAuth();
  const [bookedPlace, setBookedPlace] = useState();

  // get booking all details
  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        const res = await axios.get("/api/arrbnb/v1/booking/get-booking");
        setBookedPlace(res.data.bookedDetails);
      } catch (error) {
        console.log(error);
      }
    };
    getBookingDetails();
  }, []);

  // cancil booking
  const handlecancilBooking = async (id) => {
    try {
      const response = await axios.delete(
        `/api/arrbnb/v1/booking/cancil-booking/${id}`
      );
      if (response.data.success) {
        setBookedPlace(bookedPlace.filter((booking) => booking._id !== id));
        setTimeout(() => {
          toast.success("Your Booking is now cancil ! please do new Booking");
        }, 700);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <>
      <div className="booking flex justify-center mt-6 mb-5">
        <UserMenu />
      </div>
      <div className="w-full flex justify-center flex-col">
        <div className="w-full flex items-center text-gray-800 bg-slate-50 py-3 justify-center text-2xl rounded-lg">
          Hey! 🖐 <span className="font-semibold">{auth?.user?.name}</span>
          &nbsp; details of your Booking
        </div>
        <div className="items-center grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 sm:px-3 gap-2 mt-10">
          {bookedPlace?.map((b) => (
            <div key={b._id} className=" bg-slate-100 rounded-md p-3">
              <div className="photo w-full h-32 mb-2">
                <img
                  src={b.place.photos[0]}
                  alt="Img-1"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="py-2 text-center border rounded-lg bg-white text-md font-bold">
                <span className="">{b?.place?.title.substring(0, 30)}</span>
              </div>
              <Link
                to={`/place/${b?.place?._id}`}
                className="flex justify-between w-full items-center border-4 px-2 py-1 mt-2"
              >
                <div className="flex items-center flex-col">
                  <span>Check In</span>
                  <span className="text-md font-bold">
                    {format(new Date(b.checkIn), "dd-MM-yyyy")}
                  </span>
                </div>
                <div>
                  <BiTransfer size={20} />
                </div>
                <div className="flex flex-col items-center">
                  <span>Check Out</span>
                  <span className="text-md font-bold">
                    {format(new Date(b.checkOut), "dd-MM-yyyy")}
                  </span>
                </div>
              </Link>
              <div className="flex justify-center flex-col items-center mt-3">
                <span>
                  Booked by Mr./Miss.{" "}
                  <span className="text-lg font-bold">{b.name}</span>{" "}
                </span>
                <span className="">
                  Mob no. <span className="text-lg font-bold">{b.mobno}</span>
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span>
                  Total Price:{" "}
                  <span className="text-lg font-bold">{b.price}</span>
                </span>
                <span>
                  No of Guest:{" "}
                  <span className="text-lg font-bold">{b.guest}</span>
                </span>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => handlecancilBooking(b?._id)}
                  type="submit"
                  className="w-full py-2 px-2 bg-red-500 font-bold text-white rounded-md"
                >
                  Cancil Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookings;
