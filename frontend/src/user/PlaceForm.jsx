import React, { useEffect, useState } from "react";
import Perks from "../components/Perks";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PlaceForm = ({ setShowForm }) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extrainfo, setExtrainfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxguest, setMaxguest] = useState();
  const navigate = useNavigate();

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

  // created place post on api
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      const response = await axios.put(
        `/api/arrbnb/v1/place/update-place/${id}`,
        {
          title,
          address,
          photos,
          description,
          perks,
          price,
          extrainfo,
          checkin,
          checkout,
          maxguest,
        }
      );
      toast.success("Place updated Successfully:", response.data.message);
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
      setPrice("");
      setTimeout(() => {
        navigate("/dashboard/user/place");
      }, 1500);
    } else {
      try {
        const response = await axios.post("/api/arrbnb/v1/place/create-place", {
          title,
          address,
          photos,
          description,
          perks,
          price,
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
        setPrice("");
        setShowForm(false);
      } catch (error) {
        console.error("Error creating place:", error);
      }
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/api/arrbnb/v1/place/get-place/${id}`)
      .then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.Perks);
        setExtrainfo(data.extrainfo);
        setCheckin(data.checkin);
        setCheckout(data.checkout);
        setMaxguest(data.maxguest);
        setPrice(data.price);
      })
      .catch((error) => {
        console.error("Error fetching place:", error);
      });
  }, [id]);

  return (
    <>
      <form
        className="mt-5 mx-auto mb-20 md:w-1/2 sm:px-4 sm:w-full flex flex-col text-left gap-4 "
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
          <div
            className="px-2 w-28 h-full bg-slate-600 rounded-tr-full rounded-br-full text-white flex items-center cursor-pointer"
            onClick={handleAddPhoto}
          >
            Add photo
          </div>
        </div>
        <div className="w-full py-4 px-2 text-center flex justify-center rounded-lg cursor-pointer gap-1 text-xl">
          {photos.map((photo, index) => (
            <div>
              <img
                key={index}
                src={photo}
                alt={`Photo ${index}`}
                style={{ maxWidth: "250px", maxHeight: "125px" }}
                className="rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemovePhoto(index)}
                className="text-right"
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
        <label className="text-xl text-left">Price:</label>
        <input
          type="number"
          placeholder="Add place ₹ price"
          required
          className="outline outline-1 outline-slate-400 py-2 px-4 rounded-full"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default PlaceForm;
