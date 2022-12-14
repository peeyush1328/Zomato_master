import mongoose from "mongoose";

const Orderschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    orderdetails: [
      {
        food: [
          {
            Details: { type: mongoose.Types.ObjectId, ref: "foods" },
            quantity: { type: Number, required: true },
          },
        ],
        paymode: { type: String, required: true },
        status: { type: String, default: "Placed" },
        paymentdetails: {
          itemTotal: { type: Number, required: true },
          promo: { type: Number, required: true },
          tax: { type: Number, requied: true },
          razor_pay_id: { type: String, required: true },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Ordermodel = mongoose.model("orders", Orderschema);
