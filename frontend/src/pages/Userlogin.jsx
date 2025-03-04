import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

const Userlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser} =useContext(UserDataContext);
  const navigate=useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();
    const userData=  { email, password };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData);
    if(response.status===200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token); 
      navigate('/UserHome');
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="h-screen flex flex-col sm:items-center sm:justify-center bg-white text-black dark:bg-gray-900 dark:text-white p-7">
      <div className="sm:w-96 rounded-lg w-full">
        <img 
          className="w-20 sm:w-25 mb-10 dark:bg-white p-1 rounded-md" 
          src="/images/logo.png" 
          alt="Logo" 
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-xl mb-2">What's your email</h3>
          <input
            className="px-4 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white mb-7 py-2 rounded w-full text-lg placeholder-gray-500 dark:placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@xyz.com"
            type="text"
          />
          <h3 className="text-xl mb-2">Password</h3>
          <input
            className="px-4 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white mb-7 py-2 rounded w-full text-lg placeholder-gray-500 dark:placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            type="password"
          />
          <button className="px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold mb-7 py-2 rounded w-full text-lg">
            Login
          </button>
          <p className="text-center">
            New here? <Link className="text-blue-600 dark:text-blue-400 font-semibold hover:underline" to="/register">Create an account</Link>
          </p>
        </form>
      </div>
      <div className="sm:w-96 w-full mt-4">
        <Link
          to="/CaptainLogin"
          className="px-4 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded w-full text-lg"
        >
          Login as Captain
        </Link>
      </div>
    </div>
  );
};

export default Userlogin;
