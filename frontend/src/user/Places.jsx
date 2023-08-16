import axios from "axios";
import React, { useState, useEffect } from "react";
import Placecard from "./Placecard";

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
            <Placecard key={place._id} place={place} setPlaces={setPlaces} />
          ))}
      </div>
    </>
  );
};

export default Places;
