import React from "react";
// import axios from "axios";

const Home = () => {
  // const [hotels, setHotels] = useState([]);
  // const options = {
  //   method: "GET",
  //   url: "https://booking-com.p.rapidapi.com/v1/hotels/photos",
  //   params: {
  //     hotel_id: "1377073",
  //     locale: "en-gb",
  //   },
  //   headers: {
  //     "X-RapidAPI-Key": "d49761661amsh2eecf42abbf681dp1e8af5jsn8790fa4894e6",
  //     "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  //   },
  // };

  // const getHotelDetails = async () => {
  //   try {
  //     const response = await axios.request(options);
  //     setHotels(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(401).send({
  //       message: error?.message || "Something went wrong",
  //     });
  //   }
  // };
  // useEffect(() => {
  //   getHotelDetails();
  // }, []);

  return (
    <>
      <div className="w-full mx-auto grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 h-[80vh]">
        {/* {
          // Hotel Details
          hotels.map((h) => (
            <div className="p-2 border" key={hotels._id}>
              <img src={h.url_max} alt="" />
              <h3>{h.tag_name}</h3>
              <h3>{h.tag_type}</h3>
            </div>
          ))
        } */}
      </div>
    </>
  );
};

export default Home;
