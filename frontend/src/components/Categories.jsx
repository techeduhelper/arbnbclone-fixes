import React from "react";
import { CategoriesList } from "./CategoryProvider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BiGitPullRequest } from "react-icons/bi";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 1800, min: 1300 },
    items: 12,
  },
  desktop: {
    breakpoint: { max: 1300, min: 776 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 776, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
  },
};

const Categories = () => {
  return (
    <>
      <div className="flex items-center w-full">
        <Carousel
          responsive={responsive}
          transitionDuration={500}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          draggable={true}
          renderButtonGroupOutside={true}
          className="w-11/12"
          infinite={true}
        >
          {CategoriesList.map((c) => (
            <div
              key={c._id}
              className="flex flex-col justify-center items-center text-gray-600 py-3 my-3"
            >
              <span className="p-2 cursor-pointer">
                <c.icon size={25} />
              </span>
              <span className="text-base">{c.name}</span>
            </div>
          ))}
        </Carousel>
        <button className="flex items-center gap-2 p-4 px-5 border rounded-lg font-bold">
          <BiGitPullRequest className="rotate-45" />
          Filter
        </button>
      </div>
    </>
  );
};

export default Categories;
