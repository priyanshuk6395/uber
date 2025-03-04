import React from "react";
import { Link } from "react-router-dom";

const FinishRide = ({ setFinishRide,rideData,rideEnder }) => {
  return (
    <div>
      <div className="mb-4">
        <h5
          onClick={() => {
            setFinishRide(false);
          }}
          className="absolute w-screen left-0 top-0 text-center text-2xl font-bold text-black dark:text-white"
        >
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
      </div>
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-xl transition-all relative w-full max-w-md">
        {/* Rider Info */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col items-center gap-3">
            <img
              className="h-25 w-25 rounded-full border-2 border-gray-300"
              src="/images/user.jpeg"
              alt="Rider"
            />
            <div>
              <h3 className="text-2xl font-semibold text-black dark:text-white">
                {rideData?.user?.fullname?.firstname +
                  " " +
                  rideData?.user?.fullname?.lastname}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              ₹{rideData?.fare}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{(rideData?.distance / 1000).toFixed(1)} km</p>
          </div>
        </div>

        {/* Ride Details */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
          {/* Pickup Location */}
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              PICK UP
            </h4>
            <p className=" text-black dark:text-white">
            {rideData?.pickup}
            </p>
          </div>

          {/* Drop-off Location */}
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              DROP OFF
            </h4>
            <p className=" text-black dark:text-white">
            {rideData?.destination}
            </p>
          </div>

          {/* Ride Type & Payment */}
          <div className="flex justify-between mb-3">
            <p className="text-sm text-black dark:text-white">
              <strong>Payment:</strong> UPI
            </p>
          </div>
        </div>

        {/* Accept/Cancel Buttons */}
        <div className="mt-8 w-full">
          <Link
            to="/CaptainHome"
            onClick={() => {
              rideEnder();
            }}
            className="bg-green-500 w-full block text-center text-white text-lg font-semibold px-7 py-2 rounded-md shadow-md transition-all"
          >
            Complete Ride
          </Link>
          <p className="text-red-400 text-center mt-8 text-sm">
            Click on "Complete Ride" only when payment is done.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
