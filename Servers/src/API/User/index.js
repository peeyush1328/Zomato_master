import express from "express";
import { Usermodel } from "../../Databases/Allmodels";
import passport from "passport";
import { validateId } from "../../Validation/CommonValidation";

const Router = express.Router();

Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { fullName, email, address, phoneNumber } = req.user;
      return res.json({ user: { fullName, email, address, phoneNumber } });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);
Router.get("/:_id", async (req, res) => {
  try {
    await validateId(req.params);
    const { _id } = req.params;
    const getUser = await Usermodel.findById(_id);
    if (!getUser) return res.status(404).json({ error: "User not found!!" });
    const { fullName } = getUser;
    return res.status(200).json({ user: { fullName } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.put(
  "/Update/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await validateId(req.params);
      const { _id } = req.params;
      const { Userdata } = req.body;
      Userdata.password = undefined;
      const Updatedata = await Usermodel.findByIdAndUpdate(
        _id,
        { $set: Userdata },
        { new: true }
      );

      if (!Updatedata) return res.status(404).json({ error: "User not Found" });
      return res.status(200).json({ user: Userdata });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
