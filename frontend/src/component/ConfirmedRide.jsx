import React from "react";

const ConfirmedRide = ({
  setConfirmedRide,
  setLookingDriver,
  vehicle,
  pickup,
  createRide,
  destination,
  fare
}) => {
  const rideinfo = {
    car: "/images/uber-car.png",
    auto: "/images/uber-auto.png",
    bike: "/images/uber-bike.png",
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md transition-all">
      {/* Close Button */}
      <h5
        onClick={() => {
          setConfirmedRide(false);
        }}
        className="absolute w-full left-0 top-0 flex justify-center text-2xl font-bold text-black dark:text-white"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>

      {/* Title */}
      <h3 className="text-2xl text-center font-semibold mb-5 text-black dark:text-white">
        Confirm your Ride
      </h3>

      {/* Ride Details */}
      <div className="flex flex-col justify-between items-center">
        <img className="h-30" src={rideinfo[vehicle]} alt={vehicle} />

        {/* Locations & Payment */}
        <div className="w-full mt-5 gap-4">
          {/* Pickup Location */}
          <div className="flex items-center gap-3 p-2 border-b dark:border-gray-700">
            <i className="ri-map-pin-fill text-lg text-gray-900 dark:text-gray-300"></i>
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {pickup.split(",")[0]}
              </h3>
              <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                {pickup.split(",").slice(1).join(",").trim()}
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-3 p-2 border-b dark:border-gray-700">
            <i className="ri-map-pin-3-fill text-lg text-gray-900 dark:text-gray-300"></i>
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {destination.split(",")[0]}
              </h3>
              <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                {destination.split(",").slice(1).join(",").trim()}
              </p>
            </div>
          </div>

          {/* Fare & Payment Method */}
          <div className="flex items-center gap-3 p-2">
            <i className="ri-money-rupee-circle-fill text-lg text-gray-900 dark:text-gray-300"></i>
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                ₹ {fare?.[vehicle]}
              </h3>
              <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                Cash Payment
              </p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => {
            setConfirmedRide(false);
            setLookingDriver(true);
            createRide();
          }}
          className="bg-[#069937] dark:bg-[#045a22] mt-5 w-full text-white text-xl font-semibold px-7 py-2 active:font-normal active:bg-[#2a7242] dark:active:bg-[#03481a] rounded-md transition-all"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
