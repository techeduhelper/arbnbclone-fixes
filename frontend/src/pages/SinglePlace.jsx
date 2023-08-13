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
          <div className="px-5 py-4 mx-auto flex flex-col">
            <div className="mx-auto">
              <div className="rounded-lg h-64">
                {place.photos && place.photos.length > 0 && (
                  <div className="grid lg:grid-cols-2 md:grid-cols-1 h-full grid-rows-1">
                    {place.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Photo ${index}`}
                        className="max-h-80 max-w-full object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
              {/* Rest of your component code */}
              <div className="text-lg mb-4">
                {place.address && <p>{place.address}</p>}
                {/* Render other properties like address */}
              </div>
              {/* Rest of your component code */}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SinglePlace;
