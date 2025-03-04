import React from "react";

const WaitingForDriver = (props) => {
  return (
    <>
      <h3 className="top-0 text-2xl text-center font-semibold mb-5 text-black dark:text-white">
        Waiting for your Rider
      </h3>
      <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md transition-all">
        {/* Rider Details */}
        <div className="flex items-center justify-between">
          <img className="h-18" src="/images/uber-car.png" alt="Car" />
          <div className="text-right">
            <h2 className="text-md font-medium text-black dark:text-white">
              {props?.ride?.captain.fullname.firstname +
                " " +
                props?.ride?.captain.fullname.lastname}
            </h2>
            <h4 className="text-xl font-semibold -m-1 text-black dark:text-white">
              {props?.ride?.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Black Thar
            </p>
          </div>
        </div>
        <h2 className="text-2xl bg-gray-700 rounded-md w-full text-center font-medium text-black dark:text-white tracking-widest">
          {props.ride?.otp}
        </h2>

        {/* Ride Details */}
        <div className="flex flex-col justify-between items-center">
          <div className="w-full mt-5 gap-4">
            {/* Pickup Location */}
            <div className="flex items-center gap-3 p-2 border-b dark:border-gray-700">
              <i className="ri-map-pin-3-fill text-lg text-gray-900 dark:text-gray-300"></i>
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {props?.ride?.pickup}
                </h3>
                <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                  {props?.ride?.destination}
                </p>
              </div>
            </div>

            {/* Fare & Payment Method */}
            <div className="flex items-center gap-3 p-2">
              <i className="ri-money-rupee-circle-fill text-lg text-gray-900 dark:text-gray-300"></i>
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  ₹{props?.ride?.fare}
                </h3>
                <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                  Cash Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingForDriver;
