const rideService = require("../services/ride.services");
const { validationResult } = require("express-validator");
const mapservice = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination, vehicleType } = req.body;
    const user = req.user._id;
    if (!user || !pickup || !destination || !vehicleType) {
      throw new Error("All fields are required");
    }
    const ride = await rideService.createRide({
      user,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);
    const { ltd, lng } = await mapservice.getAddressCoordinates(pickup);
    const captainsInRadius = await mapservice.getCaptainsInRadius(ltd, lng, 10);
    ride.otp = "";

    const ridewithuser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");
    captainsInRadius.map(async (captain) => {
      await sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: ridewithuser,
      });
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination } = req.query;
    if (!pickup || !destination) {
      throw new Error("All fields are required");
    }
    const fare = await rideService.getFare(pickup, destination);

    return res.status(200).json(fare);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  const captain = req.captain._id;
  try {
    const ride = await rideService.confirmRide({ rideId, captain });

    await sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId ,otp} = req.query;
  try {
    const ride = await rideService.startRide({rideId,otp,captain:req.captain});
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.endRide({ rideId,captain:req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}