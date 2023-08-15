import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Booking = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState(1);
  const pricePernight = place.price;
  const [total, setTotal] = useState(pricePernight);
  const [price, setPrice] = useState();
  const [incluedTaxText, setIncluedTaxText] = useState("Total before taxes");
  const [calToCheckout, setCalToCheckout] = useState(false);
  const [name, setName] = useState("");
  const [mobno, setMobno] = useState("");
  const Navigate = useNavigate();

  // for calculating and some switcing Case
  const chnagetaxText = () => {
    setIncluedTaxText("Total including all taxes");
  };

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleBooking = () => {
    if (isNaN(new Date(checkIn)) || isNaN(new Date(checkOut))) {
      return;
    }
    const oneDay = 24 * 60 * 60 * 1000;
    const days =
      Math.round((new Date(checkOut) - new Date(checkIn)) / oneDay) + 1;
    const totalCost = pricePernight * days * guest;

    const rateOfTax = 0.12;
    const totalTax = totalCost * rateOfTax;
    const includingTaxTotal = totalCost + totalTax;
    // toFixed(1) only one decimal place
    setTotal(totalCost + "+" + " ₹" + totalTax.toFixed(1));
    setPrice("₹" + includingTaxTotal);
    chnagetaxText();
    if (pricePernight != includingTaxTotal) {
      setCalToCheckout(true);
    }
  };

  // create booking
  const createBooking = async () => {
    try {
      const res = await axios.post("/api/arrbnb/v1/booking/new-booking", {
        place: place._id,
        name,
        mobno,
        price,
        checkIn,
        checkOut,
        guest,
      });
      const bookingId = res.data._id;
      toast.success("Your Booking Successfully");
      setTimeout(() => {
        Navigate("/dashboard/user/bookings");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="md:ml-10 sm:w-full md:w-2/5 bg-[#ffffff] shadow-xl sticky-top rounded-md h-auto border z-10 flex sm:">
        <div className="flex flex-col justify-start p-10 w-full">
          <div className="flex  justify-between">
            <div className="flex flex-col">
              <span className="text-2xl text-gray-900 items-center font-semibold">
                ₹ {total}
              </span>
              <span className="text-gray-500">{incluedTaxText}</span>
            </div>
            <span className="text-2xl text-gray-900 items-center font-semibold">
              {price}
            </span>
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
                      onChange={(e) =>
                        setCheckIn(formatDateForInput(new Date(e.target.value)))
                      }
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
                      onChange={(e) =>
                        setCheckOut(
                          formatDateForInput(new Date(e.target.value))
                        )
                      }
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
                onChange={(e) => setGuest(parseInt(e.target.value))}
                className="w-[95%] h-4/5 outline-none  border-2 rounded-lg px-4 font-bold"
              />
            </div>
          </div>
          {!calToCheckout ? (
            <button
              className="mt-4 w-full py-3 text-white rounded-md bg-red-500"
              onClick={handleBooking}
            >
              Check Now
            </button>
          ) : (
            <div>
              <div className="flex flex-col mt-2">
                <label>Name:</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="outline-none  border-2 rounded-lg px-2 font-bold py-2"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label>Phone No.</label>
                <input
                  value={mobno}
                  onChange={(e) => setMobno(e.target.value)}
                  type="text"
                  className="outline-none  border-2 rounded-lg px-2 font-bold py-2"
                />
              </div>
              <Link
                // to={"/dashboard/user/bookings"}
                onClick={createBooking}
                className="mt-4 flex justify-center w-full py-3 text-white rounded-md bg-red-500"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Booking;
