import React from "react";

const VehiclePanel = ({ fare, setVehiclePanel, setConfirmedRide,setVehicle }) => {
  return (
    <div>
      <h5
        onClick={() => setVehiclePanel(false)}
        className="absolute w-full top-0 text-center text-2xl font-bold text-black dark:text-white"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <div
        onClick={() => {
          setVehiclePanel(false);
          setConfirmedRide(true);
          setVehicle("car");
        }}
        className="border-2 mt-3 border-gray-300 dark:border-gray-700 active:border-black dark:active:border-white rounded-xl flex w-full p-3 items-center justify-between bg-white dark:bg-gray-800 transition-all"
      >
        {/* Vehicle Image */}
        <img className="h-15 px-1" src="/images/uber-car.png" />

        {/* Vehicle Details */}
        <div className="w-1/2">
          <h4 className="font-medium text-sm text-gray-900 dark:text-white">
            UberGo
            <span className="text-gray-700 dark:text-gray-300">
              <i className="ri-user-3-fill"></i> 4
            </span>
          </h4>
          <h5 className="font-medium text-sm text-gray-700 dark:text-gray-300">
            2 mins away
          </h5>
          <p className="font-normal text-sm text-gray-600 dark:text-gray-400">
            Affordable, compact rides
          </p>
        </div>

        {/* Price */}
        <h2 className="text-lg font-semibold text-black dark:text-white">
          {fare?.car}
        </h2>
      </div>
      <div
        onClick={() => {
          setVehiclePanel(false);
          setConfirmedRide(true);
          setVehicle('auto');
        }}
        className="border-2 mt-3 border-gray-300 dark:border-gray-700 active:border-black dark:active:border-white rounded-xl flex w-full p-3 items-center justify-between bg-white dark:bg-gray-800 transition-all"
      >
        {/* Vehicle Image */}
        <img className="h-15 px-1" src="/images/uber-auto.png" />

        {/* Vehicle Details */}
        <div className="w-1/2">
          <h4 className="font-medium text-sm text-gray-900 dark:text-white">
          UberAuto
            <span className="text-gray-700 dark:text-gray-300">
              <i className="ri-user-3-fill"></i> 2
            </span>
          </h4>
          <h5 className="font-medium text-sm text-gray-700 dark:text-gray-300">
            4 mins away
          </h5>
          <p className="font-normal text-sm text-gray-600 dark:text-gray-400">
            Affordable Auto rides
          </p>
        </div>

        {/* Price */}
        <h2 className="text-lg font-semibold text-black dark:text-white">
          {fare?.auto}
        </h2>
      </div>
      <div
        onClick={() => {
          setVehiclePanel(false);
          setConfirmedRide(true);
          setVehicle('bike');
        }}
        className="border-2 mt-3 border-gray-300 dark:border-gray-700 active:border-black dark:active:border-white rounded-xl flex w-full p-3 items-center justify-between bg-white dark:bg-gray-800 transition-all"
      >
        {/* Vehicle Image */}
        <img className="h-15 px-1" src="/images/uber-bike.png" />

        {/* Vehicle Details */}
        <div className="w-1/2">
          <h4 className="font-medium text-sm text-gray-900 dark:text-white">
          Moto
            <span className="text-gray-700 dark:text-gray-300">
              <i className="ri-user-3-fill"></i> 1
            </span>
          </h4>
          <h5 className="font-medium text-sm text-gray-700 dark:text-gray-300">
            3 mins away
          </h5>
          <p className="font-normal text-sm text-gray-600 dark:text-gray-400">
          Affordable Motorcycle rides
          </p>
        </div>

        {/* Price */}
        <h2 className="text-lg font-semibold text-black dark:text-white">
          {fare?.bike}
        </h2>
      </div>
    </div>
  );
};
export default VehiclePanel;
