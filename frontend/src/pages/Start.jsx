import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Start = () => {
  return (
    <div className="h-screen w-full bg-cover bg-center bg-[url(https://images.stockcake.com/public/e/d/e/ede1f650-6715-4db8-a219-896e0b120d06_large/navigating-city-streets-stockcake.jpg)] flex flex-col justify-between">
      <div className="flex justify-center pt-8">
        <img className="w-1/2 md:w-1/4" src={logo} alt="Uber logo" />
      </div>
      <div className="bg-white bg-opacity-90 py-10 px-5 md:px-20 rounded-t-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-5">
          Get Started with <span className="text-blue-500">Gantabya</span>
        </h1>
        <p className="text-center text-lg mb-8">
          Your journey begins here. Discover the best way to get around the city with Gantabya.
        </p>
        <div className="flex justify-center mb-8">
          <img className="w-16 h-16 mx-2" src="https://img.icons8.com/ios-filled/50/000000/car.png" alt="Car icon" />
          <img className="w-16 h-16 mx-2" src="https://img.icons8.com/ios-filled/50/000000/map.png" alt="Map icon" />
          <img className="w-16 h-16 mx-2" src="https://img.icons8.com/ios-filled/50/000000/driver.png" alt="Driver icon" />
        </div>
        <Link to='/login' className="block bg-black text-white text-center py-3 rounded-lg text-xl font-semibold">
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;