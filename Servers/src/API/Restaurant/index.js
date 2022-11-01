import express from "express";
import { Restaurantmodel } from "../../Databases/Allmodels";
import { validateId } from "../../Validation/CommonValidation";
import {
  ValidateRestaurantCity,
  ValidateSearchString,
} from "../../Validation/RestaurantValidation";

const Router = express.Router();

Router.post("/create", async (req, res) => {
  try {
    const restaurant = await Restaurantmodel.create(req.body.item);
    return res.status(200).json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/:_id", async (req, res) => {
  try {
    await validateId(req.params);
    const { _id } = req.params;
    const restaurant = await Restaurantmodel.findById(_id);
    if (!restaurant)
      return res.status(404).json({ error: "restaurant not Found" });

    return res.status(200).json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/", async (req, res) => {
  try {
    // await ValidateRestaurantCity(req.query);
    const { city } = req.query;
    const restaurants = await Restaurantmodel.find({ city });
    if (!restaurants)
      return res
        .status(404)
        .json({ error: "NO restaurant Found in this city" });

    return res.status(200).json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/search/:string", async (req, res) => {
  try {
    // await ValidateSearchString(req.params);
    const { string } = req.params;
    const restaurants = await Restaurantmodel.find({
      string: { $regex: string, $options: "i" },
    });
    if (restaurants.length === 0)
      return res
        .status(404)
        .json({ error: `restaurant not Found with ${string}` });

    return res.status(200).json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.put("/Update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { item } = req.body;

    const Updatedata = await Restaurantmodel.findByIdAndUpdate(
      _id,
      { $set: item },
      { new: true }
    );

    if (!Updatedata) return res.status(404).json({ error: "User not Found" });
    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
