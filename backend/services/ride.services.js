const { log } = require("console");
const rideModel = require("../models/ride.model");
const Ride = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");
const { Error } = require("mongoose");
const { sendMessageToSocketId } = require("../socket");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup & destination required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 20,
    car: 50,
    bike: 10,
  };

  const perKmRate = {
    auto: 10,
    car: 20,
    bike: 5,
  };

  const costPerMinuteRate = {
    auto: 1,
    car: 2,
    bike: 0.5,
  };

  // Calculate total fare considering both distance and time
  const fare = {
    auto: parseFloat(
      (
        baseFare.auto +
        perKmRate.auto * (distanceTime.distance.value / 1000) +
        costPerMinuteRate.auto * (distanceTime.duration.value / 60)
      ).toFixed(2)
    ),
    car: parseFloat(
      (
        baseFare.car +
        perKmRate.car * (distanceTime.distance.value / 1000) +
        costPerMinuteRate.car * (distanceTime.duration.value / 60)
      ).toFixed(2)
    ),
    bike: parseFloat(
      (
        baseFare.bike +
        perKmRate.bike * (distanceTime.distance.value / 1000) +
        costPerMinuteRate.bike * (distanceTime.duration.value / 60)
      ).toFixed(2)
    ),
  };

  return fare;
}

function generateOTP(length = 6) {
  return Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((x) => x % 10)
    .join("");
}

// Create a new ride
const createRide = async (rideData) => {
  const { user, pickup, destination, vehicleType } = rideData;
  try {
    const fare = await getFare(pickup, destination);
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    const newRide = await rideModel.create({
      user,
      pickup,
      destination,
      fare: fare[vehicleType],
      otp: generateOTP(),
      distance: distanceTime.distance.value,
    });
    await newRide.save();
    return newRide;
  } catch (error) {
    throw new Error("Error creating ride: " + error.message);
  }
};

// Get ride by ID
const getRideById = async (rideId) => {
  try {
    const ride = await Ride.findById(rideId)
      .populate("user")
      .populate("captain");
    if (!ride) {
      throw new Error("Ride not found");
    }
    return ride;
  } catch (error) {
    throw new Error("Error fetching ride: " + error.message);
  }
};

// Update ride status
const updateRideStatus = async (rideId, status) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { status },
      { new: true }
    );
    if (!ride) {
      throw new Error("Ride not found");
    }
    return ride;
  } catch (error) {
    throw new Error("Error updating ride status: " + error.message);
  }
};

// Delete ride
const deleteRide = async (rideId) => {
  try {
    const ride = await Ride.findByIdAndDelete(rideId);
    if (!ride) {
      throw new Error("Ride not found");
    }
    return ride;
  } catch (error) {
    throw new Error("Error deleting ride: " + error.message);
  }
};

const confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id required");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );
  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }
  return ride;
};

const startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP required");
  }
  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status != "accepted") {
    throw new Error("Ride not accepted");
  }
  if (ride.otp != otp) {
    throw new Error("Invalid OTP");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    { status: "ongoing" }
  );
  sendMessageToSocketId(ride.captain.socketId, {
    event: "ride-started",
    data: ride,
  });
  return ride;
};

module.exports.createRide = createRide;
module.exports.getRideById = getRideById;
module.exports.updateRideStatus = updateRideStatus;
module.exports.deleteRide = deleteRide;
module.exports.getFare = getFare;
module.exports.confirmRide = confirmRide;
module.exports.startRide = startRide;

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride Id required");
  }
  const ride = await rideModel
    .findOne({ _id: rideId, captain: captain._id })
    .populate("user")
    .populate("captain");
  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status != "ongoing") {
    throw new Error("Ride not started");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    { status: "completed" }
  );
  return ride;
};
