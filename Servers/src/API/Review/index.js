import express from "express";
import { Reviewmodel } from "../../Databases/Reviews";
import passport from "passport";
import { validateId } from "../../Validation/CommonValidation";

const Router = express.Router();

Router.get("/:resID", async (req, res) => {
  try {
    // await validateId(req.params);
    const { resID } = req.params;
    const reviews = await Reviewmodel.find({ restaurant: resID }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.user;
      const { reviewData } = req.body;
      const NewRiview = await Reviewmodel.create({ ...reviewData, user: _id });
      return res.status(200).json({ NewRiview });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

Router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // await validateId(req.params);
      const { id } = req.params;
      const { user } = req.body;
      const data = await Reviewmodel.findOneAndDelete({
        _id: id,
        user: user._id,
      });
      if (!data)
        return res.status(200).json({ message: "review cant be deleted" });
      return res.status(200).json({ message: "review deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
