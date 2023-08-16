import React, { useState } from "react";

const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [divmenu, setDevmenu] = useState(true);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    setDevmenu(!divmenu);
  };

  return (
    <>
      <div className="inputcontainer inline-flex justify-center items-center border shadow-md border-gray-200 rounded-full py-2 gap-3 px-3 font-semibold cursor-pointer hover:shadow-lg md:ml-36 sm:ml-16 md:w-96 sm:justify-center sm:absolute md:static sm:w-96 h-12">
        {divmenu && (
          <div className="flex delay-300 justify-center items-center gap-4">
            <div className="anywhere text-lg h-8">Anywhere</div>
            <div className="border-l border-gray-300 h-8"></div>
            <div className="anywhere text-lg h-8">Anyweek</div>
            <div className="border-l border-gray-400 h-8"></div>
            <div className="anywhere  text-gray-500 text-lg h-8">Addguests</div>
          </div>
        )}

        {showSearch && (
          <div>
            <input
              className="outline-none w-80 px-2 transition duration-1000"
              type="text"
              placeholder="Search your dream Place"

              //   onChange={handleSearchInputChange}
            />
          </div>
        )}
        <div
          className="bg-[#FF385C] rounded-full p-1 text-white font-semibold"
          onClick={handleSearchClick}
        >
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Search;
