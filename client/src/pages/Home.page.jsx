import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//importng layout...
import HomepageLayout from "../layouts/Homepage.layout";

//imorting compoenents...
import Delivery from "../components/Delivery";
import Dining from "../components/Dining";
import Nutrition from "../components/Nutrition";
import NightLife from "../components/NightLife";

// redux
import { useDispatch } from "react-redux";
import { getRestaurant } from "../redux/reducers/restaurant/restaurant.action";

const Home = () => {
  const { type } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurant());
  }, []);
  return (
    <>
      <div className="my-5 mb-20 md:mb-10">
        {type === "delivery" && <Delivery />}
        {type === "dining" && <Dining />}
        {type === "nutri" && <Nutrition />}
        {type === "night" && <NightLife />}
      </div>
    </>
  );
};

export default HomepageLayout(Home);
