import React, {useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

const UserRegister = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);

  const submitHandler = async(e) => {
    e.preventDefault();
    const userData = { fullname: { firstname, lastname }, email, password };
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,userData);
    if(response.status===200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token);
      navigate('/UserHome')
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between bg-white text-black dark:bg-gray-900 dark:text-white">
      <div>
        <img
          className="w-20 sm:w-15 mb-7 dark:bg-white p-1 rounded-md"
          src="/images/logo.png"
          alt="Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-xl mb-2">Full Name</h3>
          <div className="flex gap-2">
            <input
              className="px-4 border bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-1/2 text-lg placeholder:text-base dark:placeholder-gray-400"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              placeholder="First Name"
              type="text"
            />
            <input
              className="px-4 border bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-1/2 text-lg placeholder:text-base dark:placeholder-gray-400"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              placeholder="Last Name"
              type="text"
            />
          </div>
          <h3 className="text-xl mb-2">Email</h3>
          <input
            className="px-4 border bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-full text-lg placeholder:text-base dark:placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@xyz.com"
            type="email"
          />
          <h3 className="text-xl mb-2">Password</h3>
          <input
            className="px-4 border bg-[#eeeeee] dark:bg-gray-800 text-black dark:text-white mb-4 py-2 rounded w-full text-lg placeholder:text-base dark:placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            type="password"
          />
          <button className="px-4 bg-[#111] dark:bg-[#fff] dark:text-black text-white font-semibold mb-4 py-2 rounded w-full text-lg">
            Register
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-blue-500 dark:text-blue-400 font-semibold" to="/login">
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

export default UserRegister;
