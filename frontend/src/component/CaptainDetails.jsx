import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
  const {captain} = useContext(CaptainDataContext);
  
  return (
    <div className="bg-white dark:bg-gray-900 transition-all">
      {/* Driver Info */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center justify-between gap-3">
          <img
            className="h-15 w-15 rounded-full object-cover"
            src="\images\car-driver.jpeg"
            alt="Driver"
          />
          <h4 className="text-lg font-medium text-black dark:text-white"> {captain?.fullname?.firstname} {captain?.fullname?.lastname}</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">₹3000</h4>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Earned</p>
        </div>
      </div>
  
      {/* Stats Section */}
      <div className="p-3 flex justify-around">
        {/* Hours Online */}
        <div className="text-center">
          <i className="font-thin text-2xl text-gray-900 dark:text-gray-300 ri-time-line"></i>
          <h5 className="text-lg font-medium text-black dark:text-white">7.2</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">Hours Online</p>
        </div>
  
        {/* Speed */}
        <div className="text-center">
          <i className="font-thin text-2xl text-gray-900 dark:text-gray-300 ri-speed-up-fill"></i>
          <h5 className="text-lg font-medium text-black dark:text-white">7.2</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">Hours Online</p>
        </div>
  
        {/* Booklets */}
        <div className="text-center">
          <i className="font-thin text-2xl text-gray-900 dark:text-gray-300 ri-booklet-line"></i>
          <h5 className="text-lg font-medium text-black dark:text-white">7.2</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">Hours Online</p>
        </div>
      </div>
    </div>
  );
  
}

export default CaptainDetails