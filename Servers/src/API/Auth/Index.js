// Importing modules 
import express from "express";
import passport from "passport";

//importing schema of user model.
import { Usermodel } from "../../Databases/Allmodels";
import {
  ValidateSignin,
  ValidateSignup,
} from "../../Validation/AuthValidation";

const Router = express.Router();

/**
 * Route     /signup
 * Des       Creating User and checking if user is already exist or not after that generating token.
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/signup", async (req, res) => {
  try {
    await ValidateSignup(req.body.credentials);
    await Usermodel.findByEmailAndPhone(req.body.credentials);
    const User = await Usermodel.create(req.body.credentials);
    const token = User.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /:sigin
 * Des       Generating token for existing user and allow user to signin.
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/signin", async (req, res) => {
  try {
    await ValidateSignin(req.body.credentials);
    const user = await Usermodel.findByEmailAndPassword(req.body.credentials);

    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /google
 * Des       authenticating gooogle for signin/signup 
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/**
 * Route     /google/callback
 * Des       redirecting the user to Homepage of the client page after successfully signup/signin
 * Params    none
 * Access    Public
 * Method    GET
 */
Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.status(200).json({
      token: req.session.passport.user.token,
    });
  }
);

export default Router;
