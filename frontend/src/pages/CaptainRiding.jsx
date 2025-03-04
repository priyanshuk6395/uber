import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../component/FinishRide";
import axios from "axios";
import LiveTracking from "../component/LiveTracking";

const CaptainRiding = () => {
  const [finishRide, setFinishRide] = useState(false);
  const [distance, setDistance] = useState(null);
  const finishRideRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(() => {
    if (finishRideRef.current) {
      gsap.to(finishRideRef.current, {
        translateY: finishRide ? "0%" : "100%",
        duration: 0.3,
        ease: "power1.out",
      });
    }
  }, [finishRide]);
  console.log(rideData);

  const rideEnder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/end-ride`,
        {
          rideId: rideData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captoken")}`,
          },
        }
      );
      if (response.status === 200) {
        setFinishRide(false);
      }
    } catch (error) {
      console.error("Error finishing ride:", error);
    }
  };
  return (
    <div className="h-screen w-full bg-white dark:bg-gray-900 transition-all">
      <div className="fixed z-10 p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16 dark:bg-white p-1 rounded-md"
          src="/images/logo.png"
          alt=""
        />
        <Link
          to="/CaptainHome"
          className=" h-10 w-10 dark:bg-black bg-white flex items-center rounded-full justify-center shadow-md"
        >
          <i className="text-xl text-gray-900 dark:text-white ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Image Section */}
      <div className="h-4/5 z-0">
        <LiveTracking />
      </div>

      {/* Details Section */}
      <div className="h-1/5 p-6 flex items-center justify-between relative mt-6">
        <h5
          onClick={() => {
            setFinishRide(true);
          }}
          className="absolute w-screen left-0 top-0 text-center text-2xl font-bold text-black dark:text-white"
        >
          <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="dark:text-white text-xl font-semibold">
          Reaching Soon...
        </h4>
        <button
          onClick={() => {
            setFinishRide(true);
          }}
          className="bg-green-500 dark:text-white text-black text-lg font-semibold px-5 py-2 rounded-md transition-all"
        >
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRideRef}
        className="h-[95%] pt-5 fixed w-full z-10 translate-y-full bottom-0 px-3 py-3 bg-white dark:bg-black dark:text-white"
      >
        <FinishRide
          setFinishRide={setFinishRide}
          rideData={rideData}
          rideEnder={rideEnder}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
