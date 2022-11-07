import mongoose from "mongoose";

const Menuschema = new mongoose.Schema(
  {
    menus: [
      {
        name: { type: String, required: true },
        items: [{ type: mongoose.Types.ObjectId, ref: "foods" }],
      },
    ],
    recommended: [
      {
        type: mongoose.Types.ObjectId,
        ref: "foods",
        index: true,
        unique: true,
        sparse: true,
      },
    ],
  },
  { timestamp: true }
);

export const Menumodel = mongoose.model("menu", Menuschema);
