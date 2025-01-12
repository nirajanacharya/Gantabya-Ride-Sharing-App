import React, { useContext } from "react";
import { Routes } from "react-router-dom";
import Captainlogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserSignup from "./pages/UserSignup";
import Userlogin from "./pages/Userlogin";
import { Route } from "react-router-dom";
import Start from "./pages/Start";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";  

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/captain-login" element={<Captainlogin />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
          <Route path="/login" element={<Userlogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route
            path="/home"
            element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/users/logout"
            element={
              <UserProtectWrapper>
                <UserLogout />
              </UserProtectWrapper>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
