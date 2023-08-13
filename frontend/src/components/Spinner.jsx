import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 500);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval); // clear the timer when component unmounts or reaches zero.
  }, [count, navigate, location, path]);

  return (
    <div>
      <div
        className="flex justify-center items-center mx-auto flex-col"
        style={{ height: "85vh" }}
      >
        <h1 className="text-pink-600 text-3xl ">
          redirecting in {count} seconds
        </h1>
        <div className="flex flex-col py-3 gap-2" role="status ">
          <div className="w-20 h-20 border-4 border-teal-600 rounded-full loader"></div>
          <span className="visually-hidden text-2xl-center">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
