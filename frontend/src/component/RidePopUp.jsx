import React from "react";

const RideRequest = ({ setAcceptedRide, setRidePanel, ride, confirmRide }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-xl transition-all relative w-full">
      {/* Rider Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            className="h-15 w-15 rounded-full"
            src="/images/user.jpeg"
            alt="Rider"
          />
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white">
              {ride?.user?.fullname?.firstname +
                " " +
                ride?.user?.fullname?.lastname}
            </h3>
            <div className="flex gap-2 mt-1">
              <span className="bg-[#007acc] text-black px-2 py-1 text-xs rounded">
                UPI
              </span>
              <span className="bg-[#007acc] text-black px-2 py-1 text-xs rounded">
                Discount
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {ride?.fare}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">2.2 km</p>
        </div>
      </div>

      {/* Ride Details */}
      <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
        {/* Pickup Location */}
        <div className="mb-2">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            PICK UP
          </h4>
          <p className="text-sm text-black dark:text-white">{ride?.pickup} </p>
        </div>

        {/* Drop-off Location */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            DROP OFF
          </h4>
          <p className="text-sm text-black dark:text-white">
            {ride?.destination}
          </p>
        </div>
      </div>

      {/* Accept/Ignore Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setRidePanel(false)}
          className="text-black bg-[#ee0748e5] font-medium px-7 py-2 rounded-md shadow text-lg"
        >
          Ignore
        </button>
        <button
          onClick={() => {
            setAcceptedRide(true);
            confirmRide();
          }}
          className="bg-green-500 text-black text-lg font-semibold px-7 py-2 rounded-md transition-all"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RideRequest;
