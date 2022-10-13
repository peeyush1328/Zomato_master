import React from "react";

const CheckoutLayout =
  (Component) =>
  ({ ...props }) => {
    return (
      <>
        <div className="container mx-auto px-4 lg:px-20">
          <Component {...props} />
        </div>
      </>
    );
  };

export default CheckoutLayout;
