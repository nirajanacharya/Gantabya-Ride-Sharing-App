import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel.component";
import car from "../assets/img/car.png";
import VehiclePanelcomponent from "../components/VehiclePanel.component";
import ConfirmedRide from "../components/ConfirmedRide";
import logo from "../assets/img/logo.png";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import {useNavigate} from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import map from '../assets/img/map.png'

const Home = () => {

  const navigate = useNavigate(); 

  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [pickupPanelOpen, setPickupPanelOpen] = useState(false);
  const [destinationPanelOpen, setDestinationPanelOpen] = useState(false);

  const [vehiclepanel, setvehiclepanel] = useState(false);
  const vehiclepanelRef = useRef(null);

  const [confirmridepanel, setconfirmridepanel] = useState(false);
  const confirmridepanelRef = useRef(null);

  const [vehiclefound, setvehiclefound] = useState(false);
  const vehiclefoundRef = useRef(null);

  const pickupPanelRef = useRef(null);
  const destinationPanelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [waitingfordriver, setwaitingfordriver] = useState(false);
  const waitingfordriverRef = useRef(null);

  const [vehicleType, setvehicleType] = useState(null);

  const [ride, setride] = useState(null);

  const [fare, setfare] = useState({});

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);
  
  useEffect(() => {
    socket.on('ride-confirmed', (ride) => {
      setvehiclefound(false);
      setwaitingfordriver(true);
      setride(ride);
    });
  
    // Clean up the event listener
    return () => {
      socket.off('ride-confirmed');
    };
  }, [socket]);

  socket.on("ride-started", ride => {
    setwaitingfordriver(false);
    navigate('/riding',{ state: { ride } });
  });

  useEffect(() => {
    if (waitingfordriver && waitingfordriverRef.current) {
      gsap.to(waitingfordriverRef.current, { transform: "translateY(0%)" });
    } else if (waitingfordriverRef.current) {
      gsap.to(waitingfordriverRef.current, { transform: "translateY(100%)" });
    }
  }, [waitingfordriver]);

  useEffect(() => {
    if (confirmridepanel && confirmridepanelRef.current) {
      gsap.to(confirmridepanelRef.current, { transform: "translateY(0%)" });
    } else if (confirmridepanelRef.current) {
      gsap.to(confirmridepanelRef.current, { transform: "translateY(100%)" });
    }
  }, [confirmridepanel]);

  useEffect(() => {
    if (pickupPanelOpen && pickupPanelRef.current && panelCloseRef.current) {
      gsap.to(pickupPanelRef.current, { height: "70%", duration: 0.5 });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else if (pickupPanelRef.current && panelCloseRef.current) {
      gsap.to(pickupPanelRef.current, { height: "0%", duration: 0.5 });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [pickupPanelOpen]);

  useEffect(() => {
    if (
      destinationPanelOpen &&
      destinationPanelRef.current &&
      panelCloseRef.current
    ) {
      gsap.to(destinationPanelRef.current, { height: "70%", duration: 0.5 });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else if (destinationPanelRef.current && panelCloseRef.current) {
      gsap.to(destinationPanelRef.current, { height: "0%", duration: 0.5 });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [destinationPanelOpen]);

  useEffect(() => {
    if (vehiclepanel && vehiclepanelRef.current) {
      gsap.to(vehiclepanelRef.current, { transform: "translateY(0%)" });
    } else if (vehiclepanelRef.current) {
      gsap.to(vehiclepanelRef.current, { transform: "translateY(100%)" });
    }
  }, [vehiclepanel]);

  useEffect(() => {
    if (vehiclefound && vehiclefoundRef.current) {
      gsap.to(vehiclefoundRef.current, { transform: "translateY(0%)" });
    } else if (vehiclefoundRef.current) {
      gsap.to(vehiclefoundRef.current, { transform: "translateY(100%)" });
    }
  }, [vehiclefound]);

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setpickup(value);
    if (value.trim() === "") {
      setPickupSuggestions([]);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { query: value },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPickupSuggestions(response.data);
      setPickupPanelOpen(true);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setdestination(value);
    if (value.trim() === "") {
      setDestinationSuggestions([]);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { query: value },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
      setDestinationPanelOpen(true);
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
  };

  const handlePickupBlur = () => {
    setPickupPanelOpen(false);
    setDestinationPanelOpen(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Pickup:", pickup, "Destination:", destination);
  };

  const handleSuggestionClick = (suggestion, type) => {
    if (type === "pickup") {
      setpickup(suggestion.name);
    } else {
      setdestination(suggestion.name);
    }
  };

  async function findTrip() {
    setvehiclepanel(true);
    setPickupPanelOpen(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setfare(response.data);
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }

  return (
    <div className="h-screen relative">
      <div>
        <img
          className="w-20 absolute left-5 top-5"
          src={logo}
          alt="uber logo"
        />
        
      </div>
      <div className="h-screen w-screen overflow-hidden">
        {/* image for temporary home page */}
        <img
          className="h-full w-full object-cover"
          src={map}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white p-5">
          <h5
            className="right-6  absolute text-2xl opacity-0"
            onClick={() => {
              setPickupPanelOpen(false);
              setDestinationPanelOpen(false);
            }}
            ref={panelCloseRef}
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form className="mb-5 relative" onSubmit={submitHandler}>
            <div className="line absolute h-20 w-1 top-4 left-5 bg-gray-600 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              value={pickup}
              onChange={handlePickupChange}
              onBlur={handlePickupBlur}
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4"
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Enter your destination"
            />
            <button
              onClick={findTrip}
              className="bg-black text-white px-4 py-2 rounded-lg w-full mt-4"
            >
              Find a trip
            </button>
          </form>
        </div>

        {/* Pickup Panel */}
        <div
          ref={pickupPanelRef}
          className="bg-white w-full overflow-hidden"
          style={{ height: "0%" }}
        >
          <LocationSearchPanel
            suggestions={pickupSuggestions}
            handleSuggestionClick={handleSuggestionClick}
            type="pickup"
            setvehiclepanel={setvehiclepanel}
            setpanelopen={setPickupPanelOpen}
          />
        </div>

        {/* Destination Panel */}
        <div
          ref={destinationPanelRef}
          className="bg-white w-full overflow-hidden"
          style={{ height: "0%" }}
        >
          <LocationSearchPanel
            suggestions={destinationSuggestions}
            handleSuggestionClick={handleSuggestionClick}
            type="destination"
            setvehiclepanel={setvehiclepanel}
            setpanelopen={setDestinationPanelOpen}
          />
        </div>
      </div>
      <div
        ref={vehiclepanelRef}
        className="fixed z-10 bottom-0 bg-white w-full p-3 translate-y-full"
      >
        <VehiclePanelcomponent
          selectVehicle={setvehicleType}
          fare={fare}
          setvehiclepanel={setvehiclepanel}
          setconfirmridepanel={setconfirmridepanel}
        />
      </div>
      <div
        ref={confirmridepanelRef}
        className="fixed z-10 bottom-0 bg-white w-full p-3 translate-y-full"
      >
        <ConfirmedRide
          fare={fare[vehicleType]}
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          setconfirmridepanel={setconfirmridepanel}
          setvehiclefound={setvehiclefound}
          setwaitingfordriver={setwaitingfordriver}
        />
      </div>
      <div
        ref={vehiclefoundRef}
        className="fixed z-10 bottom-0 bg-white w-full p-3 translate-y-full"
      >
        <LookingForDriver
          fare={fare[vehicleType]}
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          setvehiclefound={setvehiclefound}
        />
      </div>
      <div
        ref={waitingfordriverRef}
        className="fixed z-10 bottom-0 bg-white w-full p-3 translate-y-full "
      >
        <WaitingForDriver
          ride={ride}
          setvehiclefound={setvehiclefound}
          waitingfordriver={waitingfordriver}
          setwaitingfordriver={setwaitingfordriver}
        />
      </div>
    </div>
  );
};

export default Home;