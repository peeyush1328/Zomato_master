//importing modules...
import express from "express";

//importing menu and image schemas...
import { Menumodel, Imagemodel } from "../../Databases/menu";
import { validateId } from "../../Validation/CommonValidation";

const Router = express.Router();

/**
 * Route     /list/:_id
 * Des       Getting menus list on the basis of the menu's ID.
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get("/list/:_id", async (req, res) => {
  try {
    await validateId(req.params);
    const { _id } = req.params;
    const menus = await Menumodel.findById(_id);
    if (!menus)
      return res.status(404).json({ error: "No menu find on that Restaurant" });
    return res.status(200).json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /images/:_id
 * Des       Getting images of menus by the image's ID.
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get("/images/:_id", async (req, res) => {
  try {
    await validateId(req.params);
    const { _id } = req.params;
    const images = await Imagemodel.findById(_id);
    if (!images) return res.status(404).json({ message: "No images found" });
    return res.status(200).json({ images });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.post("/create", async (req, res) => {
  try {
    const menu = await Menumodel.create(req.body);
    return res.status(200).json({ menu });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
