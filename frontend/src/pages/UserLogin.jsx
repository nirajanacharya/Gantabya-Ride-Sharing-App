import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import logo from "../assets/img/logo.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        toast.success('Login successful! Redirecting to home...');

        setTimeout(() => {
          navigate("/home");
        }, 1000);

        setEmail("");
        setPassword("");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error during login:", errorMessage);
      toast.error(`Login failed: ${errorMessage}`);
    }
  };

  return (
    <div className="h-screen w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0)] flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img className="w-1/2" src={logo} alt="Uber logo" />
        </div>
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
          <h3 className="text-lg font-medium mb-2">What's your password?</h3>
          <input
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
          <button
            className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg"
            type="submit"
          >
            Login
          </button>
          <p className="text-center">
            New here?{" "}
            <Link to="/signup" className="text-blue-400">
              Create New Account
            </Link>
          </p>
        </form>
        <div className="mt-6">
          <Link
            to="/captain-login"
            className="flex items-center justify-center bg-green-400 text-black font-semibold rounded px-4 py-2 w-full text-lg"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;