import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../component/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;
  const {socket}=useContext(SocketContext);
  const navigate = useNavigate();

  socket.on('ride-ended',()=>{
    navigate('/UserHome');
  })
  return (
    <div className="h-screen w-full bg-white dark:bg-gray-900 transition-all">
      {/* Home Button */}
      <Link
        to="/UserHome"
        className="fixed z-10 top-2 right-2 h-10 w-10 dark:bg-black bg-white flex items-center rounded-full justify-center shadow-md"
      >
        <i className="text-xl text-gray-900 dark:text-white ri-home-5-line"></i>
      </Link>

      {/* Image Section */}
      <div className="h-3/5 z-0">
      <LiveTracking />
      </div>

      {/* Details Section */}
      <div className="h-2/5 p-3">
        {/* Rider Info */}
        <div className="flex items-center justify-between">
          <img className="h-18" src="/images/uber-car.png" alt="Uber Car" />
          <div className="text-right">
            <h2 className="text-lg text-black dark:text-white">
              {rideData?.captain?.fullname?.firstname || "Captain"}
            </h2>
            <h4 className="text-xl font-semibold -m-1 text-black dark:text-white">
              {rideData?.captain?.vehicle?.plate || "XXXX XX XXXX"}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {rideData?.captain?.vehicle?.color || "Unknown"}{" "}
              {rideData?.captain?.vehicle?.vehicleType || "Vehicle"}
            </p>
          </div>
        </div>

        {/* Ride Details */}
        <div className="flex flex-col justify-between items-center">
          <div className="w-full mt-5 gap-4">

            {/* Destination Location */}
            <div className="flex items-center gap-3 p-2 border-b dark:border-gray-700">
              <i className="ri-map-pin-2-fill text-lg text-gray-900 dark:text-gray-300"></i>
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {rideData?.destination || "Destination"}
                </h3>
              </div>
            </div>

            {/* Payment Info */}
            <div className="flex items-center gap-3 p-2">
              <i className="ri-money-rupee-circle-fill text-lg text-gray-900 dark:text-gray-300"></i>
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  ₹{rideData?.fare || "0"}
                </h3>
                <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                  Cash Payment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button className="bg-[#069937] mt-5 w-full text-white text-xl font-semibold px-7 py-2 active:font-normal active:bg-[#2a7242] rounded-md dark:hover:bg-[#2a7242] transition-all">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
