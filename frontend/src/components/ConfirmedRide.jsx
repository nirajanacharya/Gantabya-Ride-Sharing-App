import React from "react";
import car from "../assets/img/car.png";

const ConfirmedRide = (props) => {

  
  return (
    <div>
      <h5
        className="flex justify-center"
        onClick={() =>{ props.setconfirmridepanel(false)
          props.setvehiclefound(true)
        }
  
        }
      >
        <i className="text-3xl ri-arrow-down-s-line text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div className="gap-4 flex justify-between flex-col items-center">
        <img className="h-20" src={car} alt="car image" />
      </div>
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2" >
          <i className="ri-user-location-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Thamel, Kathmandu</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Thamel, Kathmandu, street-432
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-line"></i>
          <div>
            <h3 className="text-lg font-medium">Thamel, Kathmandu</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Thamel, Kathmandu, street-432
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 ">
          <i className="ri-cash-line"></i>
          <div>
            <h3 className="text-lg font-medium">Rs. 450</h3>
            <p className="text-sm -mt-1 text-gray-600">
              On Cash
            </p>
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => {
          props.setvehiclefound(true);
          props.setconfirmridepanel(false);
        }} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;