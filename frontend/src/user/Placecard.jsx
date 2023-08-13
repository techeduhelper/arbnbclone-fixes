import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Placecard = ({ place, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/arrbnb/v1/place/delete-place/${place._id}`
      );
      if (response.data.success) {
        console.log("Place deleted successfully");
        onDelete(place._id); // Notify parent component to update the list
      } else {
        console.error("Error deleting place:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting place:", error);
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
          </div>
        </Link>
        <div className="flex justify-center mb-0 gap-5">
          <button
            className="w-1/2  mb-3 bg-red-600 px-4 py-2 rounded-full text-white shadow-xl font-semibold border border-gray-400 border-opacity-50 animate-bounce"
            onClick={handleDelete}
          >
            Delete Place
          </button>
        </div>
      </Link>
    </>
  );
};

export default Placecard;
