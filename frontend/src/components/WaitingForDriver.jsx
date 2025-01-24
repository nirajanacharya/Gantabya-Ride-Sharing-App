import React from 'react'
import car from '../assets/img/car.png'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setwaitingfordriver(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between'>
        <img className='h-12' src={car} alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>Nirajan</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>Lu 2 pa 7777</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
        </div>
      </div>

      <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2" >
            <i class="ri-user-location-fill"></i>
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
            
            <i class="ri-cash-line"></i>
            <div>
              <h3 className="text-lg font-medium">Rs. 450</h3>
              <p className="text-sm -mt-1 text-gray-600">
                On Cash
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default WaitingForDriver