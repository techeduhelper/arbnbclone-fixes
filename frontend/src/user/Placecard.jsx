import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Placecard = ({ place, setPlaces }) => {
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `/api/arrbnb/v1/place/delete-place/${id}`
      );
    } catch (error) {
      toast.success("Place deleted successfully"), error;
    }
  };

  return (
    <>
      <Link key={place._id} className="rounded-md border-2">
        <Link
          to={"/dashboard/user/place/" + place._id}
          className="h-full px-2 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-lg"
        >
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center px-3"
            src={place.photos[0]}
            alt="Img1"
          />
          <div className="p-6">
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {place.title}
            </h1>
            <p className="leading-relaxed mb-3">
              {place.description.substring(1, 150)}
            </p>
          </div>
        </Link>
        <div className="flex justify-center mb-0 gap-5">
          <button
            className="w-1/2  mb-3 bg-red-600 px-4 py-2 rounded-full text-white shadow-xl font-semibold border border-gray-400 border-opacity-50 animate-bounce"
            onClick={() => handleDelete(place._id)}
          >
            Delete Place
          </button>
        </div>
      </Link>
    </>
  );
};

export default Placecard;
