import React, {useEffect,useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainRegister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [socketId, setSocketId] = useState("socket12345"); 
  const [status, setStatus] = useState("inactive");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [location, setLocation] = useState({ lat: null, lng: null });

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext) || {}; 

  // Get User's Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: { firstname, lastname },
      email,
      password,
      socketId,
      status,
      vehicle: { color, plate, capacity, vehicleType },
      location,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("captoken", data.token);
        navigate("/CaptainHome");
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
    }
  };
  
  return (
    <div className="p-7 h-full flex flex-col justify-between bg-white text-black dark:bg-gray-900 dark:text-white">
      <div>
        <img
          className="w-20 sm:w-15 mb-7 dark:bg-white p-1 rounded-md"
          src="/images/logo.png"
          alt="Logo"
        />
        <h2 className="text-2xl mb-4 font-bold">Join as Captain 🫡</h2>
        <form onSubmit={submitHandler}>
          <h3 className="text-xl mb-2">Full Name</h3>
          <div className="flex gap-2">
            <input
              className="px-4 border dark:outline-white bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-1/2 text-lg placeholder:text-base dark:placeholder-gray-400"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              placeholder="First Name"
              type="text"
            />
            <input
              className="px-4 border dark:outline-white bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-1/2 text-lg placeholder:text-base dark:placeholder-gray-400"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              placeholder="Last Name"
              type="text"
            />
          </div>
          <h3 className="text-xl mb-2">Email</h3>
          <input
            className="px-4 border dark:outline-white bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-full text-lg placeholder:text-base dark:placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@xyz.com"
            type="email"
          />
          <h3 className="text-xl mb-2">Password</h3>
          <input
            className="px-4 border dark:outline-white bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-full text-lg placeholder:text-base dark:placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            type="password"
          />
          <h3 className="text-xl mb-2">Vehicle Details</h3>
          <input
            className="px-4 border dark:outline-white bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-full text-lg placeholder:text-base dark:placeholder-gray-400"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            placeholder="Vehicle Color"
            type="text"
          />
          <input
            className="px-4 border dark:outline-white bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-full text-lg placeholder:text-base dark:placeholder-gray-400"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            required
            placeholder="Plate Number"
            type="text"
          />
          <input
            className="px-4 border dark:outline-white bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-full text-lg placeholder:text-base dark:placeholder-gray-400"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            placeholder="Seating Capacity"
            type="number"
          />
          <select
            className="px-4 border bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-full text-lg"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="auto">Auto</option>
          </select>
          <button className="px-4 bg-[#111] dark:bg-[#fff] dark:text-black text-white font-semibold mb-4 py-2 rounded w-full text-lg">
            Register
          </button>
          <p className="text-center">
            Already a Captain?
            <Link className="text-blue-500 dark:text-blue-400 font-semibold" to="/CaptainLogin">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
        By registering, you agree to provide accurate information and consent to our data policy.
      </p>
    </div>
  );
  
};

export default CaptainRegister;
