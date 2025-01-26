import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import logo from '../assets/img/logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        toast.success('Registration successful! Redirecting to home...');

        setTimeout(() => {
          navigate('/home');
        }, 1000);

        setEmail('');
        setPassword('');
        setFirstname('');
        setLastname('');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Error during registration:', errorMessage);
      toast.error(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <ToastContainer />
      <div>
        <div>
          <img className="w-16 mb-10" src={logo} alt="Gantabya logo" />
        </div>
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your Name?</h3>
          <div className="flex gap-4 mb-5 font-base">
            <input
              className="bg-[#eeeeee] mb-5 rounded px-4 w-full text-base placeholder:text-sm"
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] mb-5 rounded px-4 h-7 w-full text-base placeholder:text-sm"
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-7 text-base rounded px-4 w-full placeholder:text-sm"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter password?</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 text-base w-full placeholder:text-sm"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-[#111] text-white font-semibold mb-5 rounded px-4 border w-full text-lg placeholder:text-sm"
            type="submit"
          >
            Create Account
          </button>
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-2">
          By continuing, you agree to Gantabya's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;