const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dbconnect = require("./db/db");
dbconnect();
const express = require("express");
const app = express();
app.use(cors({ origin: `${process.env.REACT_URL}`, credentials: true }));
app.use(cookieParser());
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes= require("./routes/maps.routes");
const rideRoutes= require("./routes/ride.routes");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/user", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/ride", rideRoutes);
module.exports = app;
