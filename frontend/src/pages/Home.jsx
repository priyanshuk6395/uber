import React from "react";
import { Link } from "react-router-dom";
import Userlogin from "./Userlogin";

const Home = () => {
  return (
    <div className="bg-cover bg-[url(/images/bg.jpg)] sm:bg-[url(/images/bg-full.jpg)] h-screen pt-8 w-full flex sm:items-center justify-between flex-col dark:bg-gray-800">
      <img className="w-20 sm:w-25 ml-7 sm:bg-white p-1 rounded-md" src="public/images/logo.png"  alt="Logo" />
      <div className="bg-white px-9 pb-8 py-5 sm:rounded sm:mb-4 sm:w-1/2 sm:px-5 sm:py-4 sm:mx-0 dark:bg-gray-900 dark:text-white">
        <h2 className="text-2xl sm:text-xl mb-3 font-bold text-black dark:text-white">
          Get Started with Uber
        </h2>
        <Link to='/login' className="flex items-center font-semibold justify-center w-full bg-black text-white p-4 sm:p-3 rounded-full dark:bg-gray-300 dark:text-black">
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
