import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [showHighPricePlaces, setShowHighPricePlaces] = useState(false);
  const [displayText, setDisplayText] = useState("");

  //  filter by price
  const filteredPlaces = showHighPricePlaces
    ? datas.filter((data) => data.price > 10000)
    : datas;

  // button toggle
  const TogglePriceButton = () => {
    setShowHighPricePlaces(!showHighPricePlaces);
    setToggle(!toggle);
    setDisplayText(!displayText);
  };

  useEffect(() => {
    const getAllPlace = async () => {
      try {
        const res = await axios.get("/api/arrbnb/v1/place/get-place-all");
        setDatas(res.data.places);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPlace();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mb-15 h-auto">
        <Categories />
        <div className="h-20 mb-3 border-2 flex items-center mt-2 rounded-lg md:visible sm:aria-hidden sm:w-11/12 md:w-1/2 justify-between">
          <div className="flex items-center px-4 py-3 gap-7">
            <span className="text-lg font-bold text-gray-700">
              {!displayText
                ? "Display Price Greter 10000"
                : "Display All Places"}
            </span>
            <div className="h-5 bg-gray-200 w-[0.05rem]"></div>
            <span className="text-gray-500">
              Includes all fees, before taxes
            </span>
          </div>
          <div onClick={TogglePriceButton} className="mr-8">
            {!toggle ? <BsToggleOff size={55} /> : <BsToggleOn size={55} />}
          </div>
        </div>
        <div className="w-full mx-auto grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-[80vh]">
          {!showHighPricePlaces
            ? datas?.map((data, index) => (
                <div className="p-2 mt-2 " key={data._id}>
                  <Carousel
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    useKeyboardArrows={true}
                    // autoPlay={true}
                    stopOnHover={true}
                    interval={5000}
                    transitionTime={500}
                    key={index}
                    className="mb-4"
                  >
                    {data.photos.map((photo, photoIndex) => (
                      <Link key={photoIndex} to={"/place/" + data._id}>
                        <img
                          className="h-80 w-full rounded-md"
                          src={photo}
                          alt={`Image ${photoIndex}`}
                        />
                      </Link>
                    ))}
                  </Carousel>
                  <Link to={"/place/" + data._id}>
                    <div className="inline-flex justify-between w-full">
                      <span className="text-xl capitalize">{data.title}</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      </span>
                    </div>

                    <h3 className="text-gray-500">
                      {data.address.substring(1, 50)}
                    </h3>
                    <span>
                      ₹ <span className="font-bold text-lg">{data.price}</span>{" "}
                      night
                    </span>
                  </Link>
                </div>
              ))
            : filteredPlaces?.map((data, index) => (
                <div className="p-2 mt-2 " key={data._id}>
                  <Carousel
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    useKeyboardArrows={true}
                    // autoPlay={true}
                    stopOnHover={true}
                    interval={5000}
                    transitionTime={500}
                    key={index}
                    className="mb-4"
                  >
                    {data.photos.map((photo, photoIndex) => (
                      <Link key={photoIndex} to={"/place/" + data._id}>
                        <img
                          className="h-80 w-full rounded-md"
                          src={photo}
                          alt={`Image ${photoIndex}`}
                        />
                      </Link>
                    ))}
                  </Carousel>
                  <Link to={"/place/" + data._id}>
                    <div className="inline-flex justify-between w-full">
                      <span className="text-xl capitalize">{data.title}</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      </span>
                    </div>

                    <h3 className="text-gray-500">
                      {data.address.substring(1, 50)}
                    </h3>
                    <span>
                      ₹ <span className="font-bold text-lg">{data.price}</span>{" "}
                      night
                    </span>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Home;
