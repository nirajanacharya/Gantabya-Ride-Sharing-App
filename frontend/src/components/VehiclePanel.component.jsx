import React from 'react'
import car from '../assets/img/car.png'

const VehiclePanelcomponent = (props) => {
  const { fare = {} } = props;

  return (
    <div>
      <h5 className="flex justify-center" onClick={() => props.setvehiclepanel(false)}>
        <i className="text-3xl ri-arrow-down-s-line text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div onClick={() => props.setconfirmridepanel(true)} className="mb-2 border-2 active:border-black rounded-2xl w-full flex items-center p-3 justify-between bg-white">
        <img className="h-16" src={car} alt="" />
        <div className="w-1/2 ml-3">
          <h4 className="font-medium">
            UberGo{" "}
            <span>
              <i className="ri-user-line"></i>4
            </span>
          </h4>
          <h5 className="font-medium">2 mins away</h5>
          <p className="text-sm text-gray-500">Affordable. compact rides</p>
        </div>
        <h2 className="ml-3 font-semibold text-2xl">रु.{fare.car !== undefined ? fare.car : 'N/A'}</h2>
      </div>
      <div onClick={() => props.setconfirmridepanel(true)} className="mb-2 border-2 active:border-black rounded-2xl w-full flex items-center p-3 justify-between bg-white">
        <img className="h-16" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
        <div className="w-1/2 ml-3">
          <h4 className="font-medium">
            Moto{" "}
            <span>
              <i className="ri-user-line"></i>1
            </span>
          </h4>
          <h5 className="font-medium">3 mins away</h5>
          <p className="text-sm text-gray-500">Affordable, motorcycle rides</p>
        </div>
        <h2 className="ml-3 font-semibold text-2xl">रु.{fare.motorcycle !== undefined ? fare.motorcycle : 'N/A'}</h2>
      </div>
      <div onClick={() => props.setconfirmridepanel(true)} className="mb-2 border-2 active:border-black rounded-2xl w-full flex items-center p-3 justify-between bg-white">
        <img className="h-16" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
        <div className="w-1/2 ml-3">
          <h4 className="font-medium">
            UberAuto{" "}
            <span>
              <i className="ri-user-line"></i>3
            </span>
          </h4>
          <h5 className="font-medium">2 mins away</h5>
          <p className="text-sm text-gray-500">Affordable Auto rides</p>
        </div>
        <h2 className="ml-3 font-semibold text-2xl">रु.{fare.auto !== undefined ? fare.auto : 'N/A'}</h2>
      </div>
    </div>
  )
}

export default VehiclePanelcomponent