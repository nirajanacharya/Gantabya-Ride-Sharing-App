import React from 'react'
import car from '../assets/img/car.png' 

const LookingForDriver = (props) => {
  return (
  <div>
        <h5
          className="flex justify-center"
          onClick={() => {props.setvehiclefound(false)
          }}
        >
          <i className="text-3xl ri-arrow-down-s-line text-gray-300"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>
        <div className="gap-4 flex justify-between flex-col items-center">
          <img className="h-20" src={car} alt="car image" />
        </div>
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2" >
            <i class="ri-user-location-fill"></i>
            <div>
              <h3 className="text-lg font-medium">pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            
            <i class="ri-cash-line"></i>
            <div>
              <h3 className="text-lg font-medium">रु.{props.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                On Cash
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default LookingForDriver