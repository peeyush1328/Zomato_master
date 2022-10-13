// Importing modules...
import express from "express";
import passport from "passport";

//importing order schema...
import { Ordermodel } from "../../Databases/order";

const Router = express.Router();

/**
 * Route     /
 * Des       Getting orderdetails of user.
 * Params    none
 * Access    Private
 * Method    GET
 */
Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;
      const Orders = await Ordermodel.findOne({ user: user._id });
      if (!Orders) return res.status(404).json({ error: "No orders found." });
      return res.status(200).json({ orders: Orders });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
 * Route     /new
 * Des       editing oderdetails of users
 * Params    none
 * Access    Private
 * Method    PUT
 */
Router.put(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;
      const { Orderdetails } = req.body;
      const addneworder = await Ordermodel.findOneAndUpdate(
        { user: user._id },
        { $push: { orderdetails: Orderdetails } },
        { new: true }
      );
      return res.status(200).json({ order: addneworder });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
