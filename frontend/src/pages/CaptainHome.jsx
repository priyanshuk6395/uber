import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";
import CaptainDetails from "../component/CaptainDetails";
import RidePopUp from "../component/RidePopUp";
import AcceptRide from "../component/AcceptRide";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../component/LiveTracking";

const CaptainHome = () => {
  const [RidePanel, setRidePanel] = useState(false);
  const RideRef = useRef(null);
  const [AcceptedRide, setAcceptedRide] = useState(false);
  const AcceptRideRef = useRef(null);
  const [ride, setRide] = useState(null);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!captain || !socket) return;

    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude, // Fixed typo: changed `ltd` to `lat`
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [captain]);

  useEffect(() => {
    if (!socket) return;
  
    const handleNewRide = (data) => {
      setRide(data);
      setRidePanel(true);
    };
  
    socket.on("new-ride", handleNewRide);
  
    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, [socket]); 


  const confirmRide = async () => {
    if (!ride || !captain) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captoken")}`,
          },
        }
      );
      setRidePanel(false);
      setAcceptedRide(true);
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  };


  useGSAP(() => {
    if (RideRef.current) {
      gsap.to(RideRef.current, {
        translateY: RidePanel ? "0%" : "100%",
        duration: 0.3,
        ease: "power1.out",
      });
    }
  }, [RidePanel]);

  useGSAP(() => {
    if (AcceptRideRef.current) {
      gsap.to(AcceptRideRef.current, {
        translateY: AcceptedRide ? "0%" : "100%",
        duration: 0.3,
        ease: "power1.out",
      });
    }
  }, [AcceptedRide]);

  return (
    <div className="h-screen w-full bg-white dark:bg-gray-900 transition-all">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16 dark:bg-white p-1 rounded-md"
          src="/images/logo.png"
          alt="Logo"
        />
        <Link
          to="/CaptainHome"
          className="h-10 w-10 dark:bg-black bg-white flex items-center rounded-full justify-center shadow-md"
        >
          <i className="text-xl text-gray-900 dark:text-white ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Image Section */}
      <div className="h-3/5">
      <LiveTracking />
      </div>

      {/* Details Section */}
      <div className="h-2/5 p-6 mt-6">
        <CaptainDetails />
      </div>

      {/* Ride Selection Panel */}
      <div
        ref={RideRef}
        className="pt-14 fixed w-full z-10 translate-y-full bottom-0 px-3 py-6 bg-white dark:bg-black dark:text-white"
      >
        <RidePopUp
          setAcceptedRide={setAcceptedRide}
          setRidePanel={setRidePanel}
          confirmRide={confirmRide}
          ride={ride}
        />
      </div>

      {/* Ride Confirmation Panel */}
      <div
        ref={AcceptRideRef}
        className="h-[90%] pt-14 fixed w-full z-10 translate-y-full bottom-0 px-3 py-6 bg-white dark:bg-black dark:text-white"
      >
        <AcceptRide
          setAcceptedRide={setAcceptedRide}
          setRidePanel={setRidePanel}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
