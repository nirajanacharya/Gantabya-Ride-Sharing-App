import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className=" bg-top bg-cover bg-[url(https://images.stockcake.com/public/e/d/e/ede1f650-6715-4db8-a219-896e0b120d06_large/navigating-city-streets-stockcake.jpg)] pt-8 h-screen w-full bg-red-500 flex justify-between flex-col">
        <div>
          <img className="w-16 ml-8 " src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" />
        </div>
        <div className="bg-white py-5 px-10 pb-7">
          <h1 className="mb-5 text-3xl font-bold">Get Started with Uber</h1>
          <Link to='/login' className="flex items-center justify-center bg-black text-white py-3 rounded">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
