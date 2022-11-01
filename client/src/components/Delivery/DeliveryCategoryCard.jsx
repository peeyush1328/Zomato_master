import React from "react";

const DeliverySmCard = ({ image, title }) => {
  return (
    <div className="lg:hidden flex flex-col  items-center  rounded-md flex-wrap cursor-pointer">
      <div className="w-28 h-26">
        <img
          className="w-full h-full object-center  rounded-full"
          src={image}
          alt={title}
        />
      </div>
      <div>
        <h3 className="text-sm my-1 text-center font-bold">{title}</h3>
      </div>
    </div>
  );
};

const DeliveryLgCard = ({ image, title }) => {
  return (
    <>
      <div className="hidden lg:flex flex-col items-center rounded-md w-full cursor-pointer">
        <div className="w-36 h-26">
          <img
            className="w-full h-full object-center  rounded-full"
            src={image}
            alt={title}
          />
        </div>
        <div>
          <h3 className="text-sm my-1 text-center font-bold w-36">{title}</h3>
        </div>
      </div>
    </>
  );
};

const DeliveryCategoryCard = (props) => {
  return (
    <>
      <DeliverySmCard {...props} />
      <DeliveryLgCard {...props} />
    </>
  );
};

export default DeliveryCategoryCard;
