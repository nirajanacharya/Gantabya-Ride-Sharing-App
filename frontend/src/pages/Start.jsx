import React from "react";
import { Link } from "react-router-dom";
import GantabyaUser from "../assets/img/GantabyaUser-.png";

const Start = () => {
  return (
    <div>
      <div className=" bg-top bg-cover bg-[url(https://images.stockcake.com/public/e/d/e/ede1f650-6715-4db8-a219-896e0b120d06_large/navigating-city-streets-stockcake.jpg)] pt-8 h-screen w-full bg-red-500 flex justify-between flex-col">
        <div>
          <img className="w-[45%] -mt-6 " src= {GantabyaUser} alt="Uber logo" />
        </div>
        <div className="bg-white py-5 px-10 pb-7">
          <h1 className="mb-5 text-3xl font-bold">Get Started with <span className="font-bold text-4xl text-blue-500">Gantabya</span> </h1>
          <Link to='/login' className="flex items-center justify-center bg-black text-white py-3 rounded">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
