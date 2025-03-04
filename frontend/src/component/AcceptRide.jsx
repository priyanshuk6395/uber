import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AcceptRide = ({ setAcceptedRide, setRidePanel, ride }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/ride/start-ride`,
      {
        params: {
          rideId: ride._id,
          otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("captoken")}`,
        },
      }
    );
    if (response.status === 200) {
      setAcceptedRide(false);
      
      navigate("/CaptainRiding",{state:{ride:response.data}});
      
    }
  };

  return (
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
              {ride?.user?.fullname?.firstname +
                " " +
                ride?.user?.fullname?.lastname}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">⭐ 4.8</p>
          </div>
        </div>
        <div className="text-right">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            ₹{ride?.fare}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {((ride?.distance ?? 0) / 1000).toFixed(2)}
            km
          </p>
        </div>
      </div>

      {/* Ride Details */}
      <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
        {/* Pickup Location */}
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            PICK UP
          </h4>
          <p className=" text-black dark:text-white">{ride?.pickup}</p>
        </div>

        {/* Drop-off Location */}
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            DROP OFF
          </h4>
          <p className=" text-black dark:text-white">{ride?.destination}</p>
        </div>

        {/* Ride Type & Payment */}
        <div className="flex justify-between mb-3">
          <p className="text-sm text-black dark:text-white">
            <strong>Ride Type:</strong> Sedan
          </p>
          <p className="text-sm text-black dark:text-white">
            <strong>Payment:</strong> UPI
          </p>
        </div>

        {/* Estimated Time */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Estimated Arrival:</strong>{" "}
          <span className="text-black dark:text-white">5-7 min</span>
        </div>
      </div>

      {/* Accept/Cancel Buttons */}
      <div className="mt-5">
        <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        >
          <input
            type="text"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            placeholder="Enter OTP"
            value={otp}
            className="px-4 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white mb-7 py-2 rounded w-full text-lg placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="flex justify-between">
            <button
              onClick={() => {
                setAcceptedRide(false);
                setRidePanel(false);
              }}
              className="bg-red-500 text-white text-lg font-medium px-7 py-2 rounded-md shadow-md"
            >
              Cancel
            </button>
            <button
            
              className="bg-green-500 text-white text-lg font-semibold px-7 py-2 rounded-md shadow-md transition-all"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcceptRide;
