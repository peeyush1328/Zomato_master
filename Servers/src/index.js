import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./Databases/ConnectionToDB";
import Auth from "./API/Auth";
import Food from "./API/Food";
import Restaurant from "./API/Restaurant";
import User from "./API/User";
import Menu from "./API/menu";
import Order from "./API/Order";
import Review from "./API/Review";
import Image from "./API/Images";
import passport from "passport";
import PrivateApi from "./config/Config";
import Googleroute from "./config/Google.auth";
import session from "express-session";
dotenv.config();
PrivateApi(passport);
Googleroute(passport);
const port = 8088;
const Zomato = express();

Zomato.use(express.json());
Zomato.use(session({ secret: process.env.SECRET_KEY }));
Zomato.use(passport.initialize());
Zomato.use(passport.session());

Zomato.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});

Zomato.use("/auth", Auth);
Zomato.use("/food", Food);
Zomato.use("/restaurant", Restaurant);
Zomato.use("/user", User);
Zomato.use("/menu", Menu);
Zomato.use("/order", Order);
Zomato.use("/review", Review);
Zomato.use("/image", Image);

Zomato.listen(port, () => {
  ConnectDB()
    .then(() => {
      console.log(`Server is Running at ${port}`);
    })
    .catch((error) => {
      console.log(
        `Server is Running at ${port} but Database connection broken`
      );
      console.log(error);
    });
});
