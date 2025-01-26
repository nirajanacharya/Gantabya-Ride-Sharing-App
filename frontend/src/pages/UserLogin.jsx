import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import logo from "../assets/img/logo.png";

const UserLogin = () => {
  // Two-way binding data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(email, password); // Debugging input data

      const userData = {
        email,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        const data = response.data; 
        setUser(data.user);
        localStorage.setItem('token',data.token);
        navigate("/home");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
    }
  };

  // JSX should be returned by the component function
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <div>
          <img
            className=" -mt-5 -ml-8 w-[50%]  mb-10 "
            src={logo}
            alt="Uber logo"
          />
        </div>
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 w-full text-lg placeholder:text-sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
          <h3 className="text-lg font-medium mb-2">What's your password?</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 w-full text-lg placeholder:text-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
          <button
            className="bg-[#111] text-white font-semibold mb-7 rounded px-4 border w-full text-lg placeholder:text-sm"
            type="submit"
          >
            Login
          </button>
          <p>
            New here?{" "}
            <Link to="/signup" className="text-blue-400">
              Create New Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="flex items-center justify-center bg-green-400 text-black font-semibold mb-7 rounded px-4 border w-full text-lg placeholder:text-sm"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
