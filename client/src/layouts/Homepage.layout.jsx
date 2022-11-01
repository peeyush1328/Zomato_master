import React from "react";

//importing Components...
import Navbar from "../components/Navbar";
import Foodtab from "../components/FoodTab";

const HomepageLayout =
  (Component) =>
  ({ ...props }) => {
    return (
      <>
        <Navbar />
        <div className="sticky top-0 z-10 bg-white">
          <Foodtab />
        </div>
        <div className="container mx-auto">
          <Component {...props} />
        </div>
      </>
    );
  };

export default HomepageLayout;
