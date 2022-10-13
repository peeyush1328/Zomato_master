import mongoose from "mongoose";

const Imageschema = new mongoose.Schema(
  {
    images: [
      {
        location: { type: String, required: true },
      },
    ],
  },
  {
    timestamp: true,
  }
);

export const Imagemodel = mongoose.model("images", Imageschema);
