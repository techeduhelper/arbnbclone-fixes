import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
            <span className="mt-3 ml-12 text-lg font-semibold">
              {place.address}
            </span>
          </div>

          <div className="px-5 py-4 mx-auto">
            <div className="mx-auto">
              <div className="rounded-lg">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 rounded-md border-spacing-2 bg-white p-6 py-3 [&>hover]:bg-slate-100">
                  <div>
                    <img
                      className="h-full w-full object-cover rounded-lg"
                      src={place.photos[0]}
                      alt={`Image 1`}
                    />
                  </div>
                  <div className="flex flex-col h-full gap-4">
                    <img
                      className="h-66 object-cover rounded-lg"
                      src={place.photos[1]}
                      alt={`Image 2`}
                    />

                    <img
                      className="h-60 object-cover rounded-lg"
                      src={place.photos[2]}
                      alt={`Image 3`}
                    />
                  </div>
                </div>

                <div className="flex text-lg mb-4 mt-8 ml-4 w-3/3 mr-8">
                  {place.address && (
                    <p className="text-justify">{place.description}</p>
                  )}
                  <div className="ml-10 w-full bg-[#ffffff] shadow-2xl sticky rounded-md h-[500px] border z-10 justify-center flex items-center">
                    Per night
                  </div>
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
