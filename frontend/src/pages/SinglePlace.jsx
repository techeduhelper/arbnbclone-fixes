import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { GiFireplace } from "react-icons/gi";
import { FaRedRiver } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import Booking from "../components/Booking";

const SinglePlace = () => {
  const { id } = useParams();
  const [place, setPlace] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    const singlePlace = async () => {
      try {
        const response = await axios.get(
          `/api/arrbnb/v1/place/single-place/${id}`
        );
        setPlace(response.data.place);
      } catch (error) {
        console.error("Error fetching place:", error);
      }
    };
    singlePlace();
  }, []);

  return (
    <>
      {place && (
        <section className="text-gray-600 body-font w-full">
          <div className="flex flex-col justify-start">
            <span className="mt-3 ml-12 text-3xl font-bold">{place.title}</span>
            <Link
              to={`http://maps.google.co.uk/maps?q=${place.address}`}
              target="_blank"
              className="flex items-center gap-1 ml-10 mt-1"
            >
              <ImLocation2 size={30} />
              <span className="mt-3 text-lg font-semibold">
                {place.address}
              </span>
            </Link>
          </div>
          <div className="px-5 py-4 mx-auto">
            <div className="mx-auto">
              <div className="rounded-lg">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 rounded-md border-spacing-2 bg-white p-6 py-3 [&>hover]:bg-slate-100 z-0">
                  <div>
                    <img
                      className="h-full w-full object-cover sm:rounded-lg md:rounded-none md:rounded-tl-xl md:rounded-bl-xl"
                      src={place.photos[0]}
                      alt={`Image 1`}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
                    <img
                      className="h-full object-cover w-full sm:rounded-lg md:rounded-none"
                      src={place.photos[1]}
                      alt={`Image 2`}
                    />

                    <img
                      className="h-full object-cover sm:rounded-lg md:rounded-none md:rounded-tr-xl w-full"
                      src={place.photos[2]}
                      alt={`Image 3`}
                    />
                    <img
                      className="h-full object-cover sm:rounded-lg md:rounded-none w-full"
                      src={place.photos[3]}
                      alt={`Image 4`}
                    />
                    <img
                      className="h-full object-cover sm:rounded-lg md:rounded-none md:rounded-br-xl w-full"
                      src={place.photos[4]}
                      alt={`Image 5`}
                    />
                  </div>
                </div>
                <div className="flex md:flex-row sm:flex-col text-lg mb-4 mt-8 ml-4 w-3/3 mr-8">
                  {place.address && (
                    <div className="w-3/5 sm:w-full md:3/5">
                      <p className="text-justify ">{place.description}</p>
                      <div className="w-full h-[0.5px] bg-slate-200 my-8"></div>
                      <div className="text-xl text-gray-700 font-bold flex  flex-col gap-5">
                        <div className="flex items-center gap-3">
                          <GiFireplace size={30} />
                          <div className="flex flex-col">
                            <span>Self Check In</span>
                            <span className="text-[1rem] font-cursive text-gray-500">
                              You can check in with the building staff.
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <FaRedRiver size={30} />
                          <div className="flex flex-col">
                            <span>Dive right in</span>
                            <span className="text-[1rem] font-cursive text-gray-500">
                              This is one of the few places in the area with a
                              pool.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-[0.5px] bg-slate-200 my-8"></div>
                      <div className="flex w-full justify-between sm:flex-col md:flex-row gap-2">
                        {place.perks.map((p) => (
                          <div className="border px-4 py-2 hover:bg-slate-900 rounded-xl font-semibold text-white cursor-pointer bg-slate-600 w-full flex items-center justify-center">
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Booking place={place} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SinglePlace;
