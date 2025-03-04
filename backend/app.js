const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dbconnect = require("./db/db");
dbconnect();
const express = require("express");
const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes= require("./routes/maps.routes");
const rideRoutes= require("./routes/ride.routes");

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  // // console.log("Headers:", req.headers);
  // console.log("Params:", req.query);
  // console.log("Body:", req.body);
  next();
});


app.use("/user", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/ride", rideRoutes);
module.exports = app;
