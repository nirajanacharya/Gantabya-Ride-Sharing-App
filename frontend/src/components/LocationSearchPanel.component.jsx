import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "Tribhuvan International Airport, Sinamangal, Kathmandu, Nepal",
    "Thamel, Kathmandu, Nepal",
    "Boudhanath Stupa, Boudha, Kathmandu, Nepal",
    "Pashupatinath Temple, Gaushala, Kathmandu, Nepal",
    "NIC Asia Bank, Satdobato, Lalitpur, Kathmandu, Nepal",
    "Civil Mall, Sundhara, Kathmandu, Nepal",
    "Durbar Marg, Kathmandu, Nepal",
    "Bhaktapur Durbar Square, Bhaktapur, Kathmandu Valley, Nepal",
    "Swayambhunath Stupa (Monkey Temple), Swayambhu, Kathmandu, Nepal",
    "Ratnapark, Kathmandu, Nepal",
    "Basantapur Durbar Square, Kathmandu, Nepal",
    "Kalimati Vegetable Market, Kalimati, Kathmandu, Nepal",
    "New Road, Kathmandu, Nepal",
    "Jawalakhel Zoo, Jawalakhel, Kathmandu, Nepal",
    "Kathmandu University School of Management, Balkumari, Lalitpur, Kathmandu, Nepal"
  ];

  return (
    <div>
      {locations.map((element, index) => (
        <div 
        onClick={() => {
          props.setvehiclepanel(true)
          props.setpanelopen(false)
        
        }}
          key={index}
          className="flex items-center p-3 border-2 border-white rounded-xl active:border-black"
        >
          <h2>
            <i className="ri-map-pin-line rounded-full bg-gray-300 mr-3"></i>
          </h2>
          <h4>{element}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
