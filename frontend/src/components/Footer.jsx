import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="flex justify-between items-center w-full sm:m-0 sm:px-0 py-4  lg:px-20 border-b-2  sm:flex-col md:flex-row">
        <div className="left flex gap-4 py-3 [&>*:hover]:text-gray-500">
          <Link>@2023 Airbnb</Link>
          <Link to={"/privacy"}>Privacy</Link>
          <Link>Terms</Link>
          <Link>Sitemap</Link>
          <Link>Company details</Link>
          <Link>Destinations</Link>
        </div>
        <div className="right flex flex-row items-center gap-3 [&>*:hover]:text-gray-500">
          <Link>
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
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </Link>
          <Link>English(In)</Link>
          <Link>INR</Link>
          <Link className="flex gap-1 items-center font-bold">
            Support & Resources
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
