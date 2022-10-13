import React from "react";
import { Outlet } from "react-router-dom";

//importing layout...
import RestaurantLayout from "../layouts/Restaurant.layout";

const Restaurant = () => {
  return (
    <>
      <div>Restaurant</div>
      <Outlet />
    </>
  );
};

export default RestaurantLayout(Restaurant);
