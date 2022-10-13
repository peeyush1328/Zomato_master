//importing modules
import express from "express";

//importing Food schema 
import { Foodmodel } from "../../Databases/Allmodels";
import { validateId } from "../../Validation/CommonValidation";

const Router = express.Router();

/**
 * Route     /create
 * Des       Create New Food Item
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/create", async (req, res) => {
  try {
    const food = await Foodmodel.create(req.body.item);
    return res.status(200).json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /:_id
 * Des       Get food item on the basis of food ID
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    await validateId(req.params);
    const { _id } = req.params;
    const food = await Foodmodel.findById(_id);
    return res.status(200).json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /r/:_id
 * Des       Get food item on the basis of restaurant ID
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get("/r/:_id", async (req, res) => {
  try {
    await validateId(req.params);
    const { _id } = req.params;
    const foods = await Foodmodel.find({
      restaurant: _id,
    });
    return res.status(200).json({ foods });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /c/:category
 * Des       Get the food item on the basis of the category
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get("/c/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await Foodmodel.find({
      category: { $regex: category, $options: "i" },
    });
    if (foods.length === 0)
      return res.status(404).json({ error: `NO Food Match ${category}` });
    return res.status(200).json({ foods });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default Router;
