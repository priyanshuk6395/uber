const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "bike"])
    .withMessage("Invalid Vehicle"),
  rideController.createRide
);

const { query } = require("express-validator");

router.get(
  "/getfare",
  [
    query("pickup")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Invalid pickup address"),
    query("destination")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Invalid destination address"),
  ],
  authMiddleware.authUser,
  rideController.getFare
);

router.post(
  "/confirm",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ID"),
  body("otp").isString().isLength(6).withMessage("Invalid OTP"),
  rideController.confirmRide
);

router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  query("rideId").isMongoId().withMessage("Invalid Ride Id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid Otp"),
  rideController.startRide
);

router.post(
  "/end-ride",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid Ride Id"),
  rideController.endRide
);
module.exports = router;
