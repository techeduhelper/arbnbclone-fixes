import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import Places from "./Places";
import PlaceForm from "./PlaceForm";

const Accomodation = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      <div className="booking flex justify-center mt-6 mb-5">
        <UserMenu />
      </div>
      <div className="w-full text-center  flex justify-center ">
        {showForm ? (
          <PlaceForm showForm={showForm} setShowForm={setShowForm} handleButtonClick={handleButtonClick} />
        ) : (
          <div className="h-[70vh] flex flex-col ">
            <div className="button-container">
              <button
                onClick={handleButtonClick}
                className="inline-flex items-center h-12 gap-1 text-xl mt-10 border-none py-2 px-4 bg-red-500 text-white rounded-full hover:scale-105 transform transition duration-300 "
              >
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add Place
              </button>
            </div>
            <Places handleButtonClick={handleButtonClick} />
          </div>
        )}
      </div>
    </>
  );
};

export default Accomodation;
