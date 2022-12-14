import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./Databases/ConnectionToDB";
import Auth from "./api/auth";
import Food from "./api/Food";
import Restaurant from "./api/Restaurant";
import User from "./api/User";
import Menu from "./api/menu";
import Order from "./api/Order";
import Review from "./api/Review";
import Image from "./api/Images";
import passport from "passport";
import PrivateApi from "./config/Config";
import Googleroute from "./config/Google.auth";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";

dotenv.config();
PrivateApi(passport);
Googleroute(passport);
const port = 8088;
const Zomato = express();

Zomato.use(cors({ origin: "http://localhost:3000" }));
Zomato.use(helmet());
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
