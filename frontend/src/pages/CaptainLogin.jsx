import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext) || {}; 


  const submitHandler = async(e)=>{
    e.preventDefault();
    const captainData = {email,password};

    setEmail('');
    setPassword('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        captainData
      );

      if (response.status === 200) {
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


  }


  return (
    <div className="p-7 h-screen flex flex-col justify-between bg-white text-black dark:bg-gray-900 dark:text-white">
      <div>
        <img
          className="w-20 sm:w-15 mb-7 dark:bg-white p-1 rounded-md"
          src="/images/logo.png"
          alt="Logo"
        />
        <h2 className="text-2xl mb-4 font-bold">Hi Captain🫡</h2>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-xl mb-2">What's your email</h3>
          <input
            className="px-4 border bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-7 py-2 rounded w-full text-lg placeholder:text-base dark:placeholder-gray-400"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="example@xyz.com"
            type="text"
          />
          <h3 className="text-xl mb-2">Password</h3>
          <input
            className="px-4 border bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-7 py-2 rounded w-full text-lg placeholder:text-base dark:placeholder-gray-400"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder="********"
            type="password"
          />
          <button className="px-4 bg-[#111] dark:bg-[#fff] dark:text-black text-white font-semibold mb-7 py-2 rounded w-full text-lg">
            Login
          </button>
          <p className="text-center">
            Want to join our fleet?
            <Link className="text-blue-500 dark:text-blue-400 font-semibold" to="/CaptainRegister">
              {" "}
              Register as Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          className="px-4 flex items-center justify-center bg-[#2e75dd] dark:bg-[#2e75dd] text-white font-semibold mb-7 py-2 rounded w-full text-lg"
        >
          Login as User
        </Link>
      </div>
    </div>
  );
  
}

export default CaptainLogin