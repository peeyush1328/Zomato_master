import mongoose from "mongoose";

const Foodschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isConatinegg: { type: Boolean, required: true },
    isVeg: { type: Boolean, required: true },
    category: { type: String, required: true },
    photos: { type: mongoose.Types.ObjectId, ref: "images" },
    price: { type: Number, default: 150, required: true },
    addOns: [{ type: mongoose.Types.ObjectId, ref: "foods" }],
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
  },
  { timestamp: true }
);

export const Foodmodel = mongoose.model("foods", Foodschema);
