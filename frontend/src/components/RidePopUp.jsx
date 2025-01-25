import React from 'react';

const RidePopUp = (props) => {
  const { user = {}, pickup, destination, fare } = props.ride || {};
  const { fullname = {} } = user;
  const { firstname = '', lastname = '' } = fullname;

  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setridepopuppanel(false)
      }}>
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3 '>
          <img className='h-12 rounded-full object-cover w-12' 
               src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" 
               alt="" />
          <h2 className='text-lg font-medium'>{firstname} {lastname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-sm -mt-1 text-gray-600'>{pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-sm -mt-1 text-gray-600'>{destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>Rs.{fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
        <div className='flex w-full gap-4 mt-4'>
          <button onClick={() => {props.setconfirmridepopuppanel(true)
            props.confirmRide
          }}
                  className='flex-1 bg-green-600 text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition-colors'>
            Accept
          </button>
          <button onClick={() => props.setridepopuppanel(false)}
                  className='flex-1 bg-gray-300 text-gray-700 font-semibold p-3 rounded-lg hover:bg-gray-400 transition-colors'>
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;