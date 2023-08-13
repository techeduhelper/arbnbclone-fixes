import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import Perks from "../components/Perks";
import toast from "react-hot-toast";
import axios from "axios";
import Places from "./Places";

const Accomodation = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
    // Reset form fields when the button is clicked to hide the form
    if (!showForm) {
      setTitle("");
      setAddress("");
      setPhotos([]);
      setPhotoLink("");
      setDescription("");
      setPerks([]);
      setExtrainfo("");
      setCheckin("");
      setCheckout("");
      setMaxguest("");
      setSubmittedData(null);
    }
  };

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extrainfo, setExtrainfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxguest, setMaxguest] = useState();
  const [submittedData, setSubmittedData] = useState(null);

  // add photos
  const handleAddPhoto = () => {
    if (photoLink) {
      setPhotos([...photos, photoLink]);
      setPhotoLink("");
    }
  };

  // remove photos
  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  // set form

  // created place post on api
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/arrbnb/v1/place/create-place", {
        title,
        address,
        photos,
        description,
        perks,
        extrainfo,
        checkin,
        checkout,
        maxguest,
      });
      toast.success("Place listing Successfully:", response.data);
      setTitle("");
      setAddress("");
      setPhotos([]);
      setPhotoLink("");
      setDescription("");
      setPerks([]);
      setExtrainfo("");
      setCheckin("");
      setCheckout("");
      setMaxguest("");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating place:", error);
    }
  };

  return (
    <>
      <div className="booking flex justify-center mt-6 mb-5">
        <UserMenu />
      </div>
      <div className="w-full text-center  flex justify-center ">
        {showForm ? (
          <form
            className="mt-5 md:w-1/2 sm:px-4 sm:w-full flex flex-col text-left gap-4 "
            onSubmit={handleSubmit}
          >
            <label className="text-xl text-left">Title:</label>
            <input
              type="text"
              placeholder="Title for Your lovely Place"
              required
              className="outline outline-1 outline-slate-400 py-2 px-4 rounded-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="text-xl text-left">Address:</label>
            <input
              type="text"
              placeholder="Address of your place"
              required
              className="outline outline-1 outline-slate-400 py-2 px-4 rounded-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="text-xl text-left">Photos:</label>
            <div className="flex w-full rounded-full">
              <input
                type="text"
                placeholder="Add photos using link-- jpg,png etc"
                className="outline outline-1 outline-slate-400 py-2 px-4 rounded-tl-full rounded-bl-full w-[87%]"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
              />
              <button
                className=" px-2 bg-slate-600 rounded-tr-full rounded-br-full text-white"
                onClick={handleAddPhoto}
              >
                Add photo
              </button>
            </div>
            <div className="w-full py-4 px-2 text-center flex justify-center rounded-lg cursor-pointer gap-1 text-xl">
              {photos.map((photo, index) => (
                <div>
                  <img
                    key={index}
                    src={photo}
                    alt={`Photo ${index}`}
                    style={{ maxWidth: "200px", maxHeight: "150px" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <label className="text-xl text-left">Description:</label>
            <input
              type="text"
              placeholder="Add place description"
              required
              className="outline outline-1 outline-slate-400 py-2 px-4 rounded-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="text-xl text-left">Perks:</label>
            <div className="grid grid-cols-2 md:grid-cols-3  gap-2">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            <label className="text-xl text-left">ExtraInfo:</label>
            <textarea
              type="text"
              rows="2"
              placeholder="Add place Extra info"
              className="outline outline-1 outline-slate-400 py-2 px-4 rounded-md sm:h-20"
              value={extrainfo}
              onChange={(e) => setExtrainfo(e.target.value)}
            />
            {console.log(extrainfo)}
            <label className="text-xl text-left">
              Check In, Check Out & maxGuest:
            </label>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="23:00"
                className="outline outline-1 outline-slate-400 py-2 px-4 rounded-md"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
              />

              <input
                type="text"
                placeholder="06:00"
                className="outline outline-1 outline-slate-400 py-2 px-4 rounded-md"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
              />

              <input
                type="number"
                placeholder="10"
                className="outline outline-1 outline-slate-400 py-2 px-4 rounded-md"
                value={maxguest}
                onChange={(e) => setMaxguest(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex  w-full justify-center gap-1 text-xl mt-10 border-none py-2 px-4 bg-red-500 text-white rounded-full hover:scale-103 transform transition duration-500"
              >
                Add Now
              </button>
            </div>
          </form>
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
            <Places />
          </div>
        )}
      </div>
    </>
  );
};

export default Accomodation;
