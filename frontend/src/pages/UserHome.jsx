import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../component/LocationSearchPanel";
import VehiclePanel from "../component/VehiclePanel";
import ConfirmedRide from "../component/ConfirmedRide";
import LookingForDriver from "../component/LookingForDriver";
import WaitingForDriver from "../component/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../component/LiveTracking";

const UserHome = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panel, setPanel] = useState(false);
  const panelRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmedRide, setConfirmedRide] = useState(false);
  const confirmedRideRef = useRef(null);
  const [waitDriver, setWaitDriver] = useState(false);
  const waitDriverRef = useRef(null);
  const [lookingDriver, setLookingDriver] = useState(false);
  const lookingDriverRef = useRef(null);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (data) => {
    setRide(data);
    setLookingDriver(false);
    setWaitDriver(true);
  });

  socket.on('ride-started',(ride)=>{
    setWaitDriver(false);
    navigate('/riding',{state:{ride}});
  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setPickupSuggestions(response.data);
    } catch (err) {
      console.log("error: " + err);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setDestinationSuggestions(response.data);
    } catch (err) {
      console.log("error: " + err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        height: panel ? "75%" : "0%",
        paddingTop: panel ? "5%" : "0%",
      });

      gsap.to(".icon", {
        opacity: panel ? 1 : 0,
        duration: 0.3,
        ease: "power1.out",
      });
      gsap.to(".sbutton", {
        opacity: panel ? 1 : 0,
        duration: 0.4,
        ease: "power1.out",
      });
    }
  }, [panel]);

  useGSAP(() => {
    if (vehiclePanelRef.current) {
      gsap.to(vehiclePanelRef.current, {
        translateY: vehiclePanel ? "0%" : "100%",
        duration: 0.3,
        ease: "power1.out",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmedRideRef.current) {
      gsap.to(confirmedRideRef.current, {
        translateY: confirmedRide ? "0%" : "100%",
        duration: 0.2,
        ease: "power1.out",
      });
    }
  }, [confirmedRide]);

  useGSAP(() => {
    if (waitDriverRef.current) {
      gsap.to(waitDriverRef.current, {
        translateY: waitDriver ? "0%" : "100%",
        duration: 0.2,
        ease: "power1.out",
      });
    }
  }, [waitDriver]);

  useGSAP(() => {
    if (lookingDriverRef.current) {
      gsap.to(lookingDriverRef.current, {
        translateY: lookingDriver ? "0%" : "100%",
        duration: 0.2,
        ease: "power1.out",
      });
    }
  }, [lookingDriver]);

  async function findTrip() {
    setVehiclePanel(true);
    setPanel(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/ride/getfare`,
      {
        params: {
          pickup,
          destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/create`,
      {
        pickup,
        destination,
        vehicleType: vehicle,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  return (
    <div className="h-screen relative overflow-hidden dark:bg-black">
      <img
        className="w-16 absolute left-5 top-5 dark:bg-white p-1 rounded-md"
        src="/images/logo.png"
        alt=""
      />
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>

      <div className="flex flex-col justify-end h-full absolute top-0 w-full">
        <div className="bg-white dark:bg-black dark:text-white h-[28%] p-5 relative">
          <h5
            onClick={() => setPanel(false)}
            className="absolute icon top-2 right-3 text-2xl font-bold dark:text-white"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-15 w-1 top-[40%] left-10 rounded bg-black dark:bg-white"></div>
            <input
              className="bg-gray-100 dark:bg-black dark:text-white px-12 py-2 text-base rounded-lg mt-4 w-full placeholder:font-semibold placeholder-gray-500 dark:placeholder-gray-400"
              type="text"
              onClick={() => {
                setPanel(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              placeholder="Add a pickup location"
            />
            <input
              className="bg-gray-100 dark:bg-black dark:text-white px-12 py-2 text-base rounded-lg mt-4 w-full placeholder:font-semibold placeholder-gray-500 dark:placeholder-gray-400"
              type="text"
              onClick={() => {
                setPanel(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Enter your destination"
            />
            <button
              onClick={findTrip}
              className="bg-black sbutton dark:bg-white text-white dark:text-black py-2 px-4 font-medium rounded-lg mt-3 mb-3 w-full hover:bg-gray-800 dark:hover:bg-gray-700 transition-all"
            >
              Find Trip
            </button>
          </form>
        </div>

        {/* Location Search Panel */}
        <div ref={panelRef} className="bg-gray-100 dark:bg-black h-0">
          <LocationSearchPanel
            activeField={activeField}
            locations={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDestination={setDestination}
          />
        </div>

        {/* Vehicle Panel */}
        <div
          ref={vehiclePanelRef}
          className="pt-14 fixed w-full z-10 translate-y-full bottom-0 px-3 py-6 bg-white dark:bg-black dark:text-white"
        >
          <VehiclePanel
            setConfirmedRide={setConfirmedRide}
            setVehiclePanel={setVehiclePanel}
            fare={fare}
            setVehicle={setVehicle}
          />
        </div>

        {/* Confirm Ride Panel */}
        <div
          ref={confirmedRideRef}
          className="pt-14 fixed w-full z-10 translate-y-full bottom-0 px-3 py-6 bg-white dark:bg-black dark:text-white"
        >
          <ConfirmedRide
            setConfirmedRide={setConfirmedRide}
            setLookingDriver={setLookingDriver}
            vehicle={vehicle}
            pickup={pickup}
            destination={destination}
            fare={fare}
            createRide={createRide}
          />
        </div>

        {/* Looking for Driver Panel */}
        <div
          ref={lookingDriverRef}
          className="pt-14 fixed w-full z-10 translate-y-full bottom-0 px-3 py-6 bg-white dark:bg-black dark:text-white"
        >
          <LookingForDriver
            setWaitDriver={setWaitDriver}
            setLookingDriver={setLookingDriver}
            vehicle={vehicle}
            pickup={pickup}
            destination={destination}
            fare={fare}
          />
        </div>

        {/* Waiting for Driver Panel */}
        <div
          ref={waitDriverRef}
          className="fixed w-full z-10 translate-y-full bottom-0 px-3 py-3 bg-white dark:bg-black dark:text-white"
        >
          <WaitingForDriver setWaitDriver={setWaitDriver} ride={ride} />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
