import React from "react";

//importing comopnents...
import DiningCarousel from "./DiningCarousel";

const Dining = () => {
  return (
    <div className="mb-10 px-4 lg:px-20">
      <h1 className="text-xl my-4 md:my-8 md:text-3xl md:font-semibold">
        Collections
      </h1>
      <DiningCarousel />
    </div>
  );
};

export default Dining;
