import axios from "axios";
import React, { useState, useEffect } from "react";

const Places = () => {
  const [places, setPlaces] = useState([]);
  // get all places listing by user
  useEffect(() => {
    const getPlace = async () => {
      try {
        const res = await axios.get("/api/arrbnb/v1/place/get-place");
        setPlaces(res.data.places);
      } catch (error) {
        console.error("Error fetching user places:", error);
      }
    };
    getPlace();
  }, []);

  return (
    <>
      <div className="place-container mt-10 w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {places &&
          places?.map((place) => (
            <div className="">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={place.photos}
                  alt="blog"
                />
                <div className="p-6">
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {place.title}
                  </h1>
                  <p className="leading-relaxed mb-3">
                    {place.description.substring(1, 150)}
                  </p>
                  <div className="flex items-center justify-center mb-0 gap-5">
                    <button className="bg-red-600 px-4 py-2 rounded-full text-white shadow-xl font-semibold border border-gray-400 border-opacity-50">
                      Delete Place
                    </button>
                    <button className="bg-green-500 px-4 py-2 rounded-full text-white shadow-xl font-semibold border border-gray-400 border-opacity-50">
                      Update Place
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Places;
