import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel.component";
import car from "../assets/img/car.png";
import VehiclePanelcomponent from "../components/VehiclePanel.component";
import ConfirmedRide from "../components/ConfirmedRide";
import GantabyaUser from "../assets/img/GantabyaUser-.png";    
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [panelopen, setpanelopen] = useState(false);

  const [vehiclepanel, setvehiclepanel] = useState(false);
  const vehiclepanelRef = useRef(null);

  const [confirmridepanel, setconfirmridepanel] = useState(false);
  const confirmridepanelRef = useRef(null);

  const [vehiclefound, setvehiclefound] = useState(false);
  const vehiclefoundRef = useRef(null);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const [waitingfordriver, setwaitingfordriver] = useState(false)
  const waitingfordriverRef = useRef(null)
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
    if (panelopen && panelRef.current && panelCloseRef.current) {
      gsap.to(panelRef.current, { height: "70%", duration: 0.5 });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else if (panelRef.current && panelCloseRef.current) {
      gsap.to(panelRef.current, { height: "0%", duration: 0.5 });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelopen]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Pickup:", pickup, "Destination:", destination);
  };

  return (
    <div className="h-screen relative">
      <div>
        <img
          className="w-16 absolute left-5 top-5"
          src={GantabyaUser}
          alt="uber logo"
        />
      </div>
      <div className="h-screen w-screen overflow-hidden">
        {/* image for temporary home page */}
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/MindorksOpenSource/ridesharing-uber-lyft-app/master/assets/nearby-cabs.png"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white p-5">
          <h5
            className="right-6  absolute text-2xl opacity-0"
            onClick={() => setpanelopen(false)}
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
              onClick={() => setpanelopen(true)}
              onChange={(e) => setpickup(e.target.value)}
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4"
              type="text"
              value={destination}
              onClick={() => setpanelopen(true)}
              onChange={(e) => setdestination(e.target.value)}
              placeholder="Enter your destination"
            />
          </form>
        </div>

        {/* Panel */}
        <div
          ref={panelRef}
          className="bg-white w-full overflow-hidden"
          style={{ height: "0%" }}
        >
          <LocationSearchPanel setvehiclepanel={setvehiclepanel} setpanelopen={setpanelopen} />
        </div>
      </div>
      <div ref={vehiclepanelRef} className="fixed z-10 bottom-0 bg-white w-full p-3 translate-y-full">
        <VehiclePanelcomponent setvehiclepanel={setvehiclepanel} setconfirmridepanel={setconfirmridepanel}/>
      </div>
      <div ref={confirmridepanelRef} className="fixed z-10 bottom-0 bg-white w-full p-3 translate-y-full">
       <ConfirmedRide setconfirmridepanel={setconfirmridepanel} setvehiclefound={setvehiclefound}/>
      </div>
      <div ref={vehiclefoundRef} className="fixed z-10 bottom-0 bg-white w-full p-3 translate-y-full">
        <LookingForDriver setvehiclefound={setvehiclefound}/>   
      </div>
      <div   ref={waitingfordriverRef} className="fixed z-10 bottom-0 bg-white w-full p-3 translate-y-full ">
        <WaitingForDriver setwaitingfordriver={setwaitingfordriver} />   
      </div>

    </div>
  );
};

export default Home;